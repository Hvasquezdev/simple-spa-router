class Router {
  constructor(routes) {
    this.routes = routes;
    this._loadInitialRoute();
  }

  routerLink(pathName) {
    let pathToLoad;
    
    if (pathName !== '/') {
      const pathNameSplit = pathName.split('/');
      pathToLoad = this._getPathSegments(pathNameSplit);
    } else {
      pathToLoad = [''];
    }

    this.loadRoute(...pathToLoad);
  }

  loadRoute(...urlSegms) {
    const matchedRoute = this._matchUrlToRoute(urlSegms);
    const url = `/${urlSegms.join('/')}`;

    history.pushState({}, '', url);

    const htmlOutElement = document.querySelectorAll('[data-router]')[0];
    htmlOutElement.innerHTML = matchedRoute.template;
  }

  _matchUrlToRoute(routeSegms) {
    const matchedUrl = this.routes.find(route => {
      const routePathSegms = route.path.split('/').slice(1);

      if (routePathSegms.length !== routeSegms.length) {
        return false;
      }

      return routePathSegms
        .every((routePathSegm, index) => routePathSegm === routeSegms[index]);
    });

    return matchedUrl;
  }

  _loadInitialRoute() {
    const pathNameSplit = window.location.pathname.split('/');
    const pathSegms = this._getPathSegments(pathNameSplit);

    this.loadRoute(...pathSegms);
  }

  _getPathSegments(pathNameSplit) {
    return pathNameSplit.length > 1 ? pathNameSplit.slice(1) : pathNameSplit.slice(0);
  }
}