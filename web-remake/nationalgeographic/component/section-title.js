const SectionTitle = ({ title, subtitle, dark }) => {
  return <div className={
    [
      "ng-section-title d-flex flex-column align-items-center mb-5",
      dark ? "ng-section-title-dark" : ""
    ].join("")
  }>
    <h1 className="ng-section-title-title">{title}</h1>
    <p className="ng-section-title-subtitle">{subtitle}</p>
    <p className="ng-section-title-bottom"></p>
  </div>
}