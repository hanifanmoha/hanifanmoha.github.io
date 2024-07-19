const Navbar = () => {

  const headerStyle = {
    minHeight : `49px`
  }

  return <header style={headerStyle} className="d-flex align-items-center px-3 ng-navbar">
    <a href><img src='assets/images/ng-logo-2fl.svg' height='32px' /></a>
    <ul className="d-flex align-items-center ml-auto ng-navbar-menu m-0 p-0">
      <li className="d-none d-md-block mr-3 c-pointer ng-navbar-subscribe">Subscribe</li>
      <li className="d-block mr-3 c-pointer"><span className="far fa-user"></span></li>
      <li className="d-none d-md-block mr-3 c-pointer"><span className="fas fa-search"></span></li>
      <li className="d-block c-pointer ng-navbar-toggle">
        <span className="d-none d-md-inline">Menu</span>
        <span className="ml-2 fas fa-angle-down">
      </span></li>
    </ul>
  </header>
}