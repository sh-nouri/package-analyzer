import requests
from db import collections

class NPMCrawler:
    def __init__(self):
        self.fetched_packages = set()
        self.max_depth = 4

    def crawl(self, package_name, package_version, depth=1):
        if package_name in self.fetched_packages:
            return

        if depth > self.max_depth:
            return

        self.fetched_packages.add(package_name)

        # Get package from NPM
        url = 'https://registry.npmjs.org/' + package_name + '/' + package_version
        print('Fetching ' + url)
        pkg = requests.get(url).json()

        # Normalize an get doc
        doc = {
            'name': pkg.get('name'),
            'version': pkg.get('version'),
            'dependencies': pkg.get('dependencies'),
            'license': pkg.get('license')
        }

        # Update DB
        collections.packages.replace_one(
            {'name': package_name},
            doc,
            upsert=True
        )

        # Fetch dependencies
        for dependency_name, dependency_version in pkg.get('dependencies', {}).items():
            dependency_version = dependency_version.replace("^", "").replace('~', "")
            self.crawl(dependency_name, dependency_version, depth+1)

        return pkg
