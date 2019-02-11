import requests
from networkx import DiGraph, draw
import matplotlib.pyplot as plt

class NPMCrawler:
    def __init__(self):
        self.graph= DiGraph()
        self.fetched_packages=set()
        self.max_depth=4

    def crawl(self, package_name, package_version, depth = 1):
        if package_name in self.fetched_packages:
            return

        if depth > self.max_depth:
            return

        self.fetched_packages.add(package_name)

        url = 'https://registry.npmjs.org/' + package_name + '/' + package_version
        pkg = requests.get(url).json()

        self.graph.add_node(pkg.get('name'), type='PACKAGE', version=pkg.get('version'))

        print('-' * depth * 2, package_name + '@' + package_version)

        for dependency_name, dependency_version in pkg.get('dependencies', {}).items():
            self.crawl(dependency_name, dependency_version, depth+1)
            self.graph.add_edge(package_name, dependency_name, type='DEPENDS')
        return pkg


crawler=NPMCrawler()
crawler.crawl('consola', 'latest')

draw(crawler.graph, with_labels=True)
plt.show()