const Explore = () => {
  return <section className="ng-explore">
    <div className="ng-explore-background">
      <div className="ng-explore-content container">
        <SectionTitle
          title="EXPLORE TODAY"
          subtitle="Through the eyes of our Explorers, photographers, journalists, and filmmakers" />

        <div className="row">
          <ExploreStory />
          <ExploreArticle />
        </div>
      </div>
    </div>
  </section>
}

const ExploreStory = () => {

  const stories = [
    {
      img: "./assets/images/extinction.jpg",
      title: "What is extinction? The answer is complicated",
      category: "ANIMALS"
    },
    {
      img: "./assets/images/run-beach.jpg",
      title: "How running can help protect our oceans",
      category: "PARTNER CONTENT"
    },
    {
      img: "./assets/images/starlink.jpg",
      title: "Will Elon Musk's Starlink satellites harm astronomy? Here's what we know.",
      category: "SCIENCE & INNOVATION"
    },
    {
      img: "./assets/images/earths.jpg",
      title: "18 Earth-size planets found in our galaxy—all hiding in plain sight",
      category: "SCIENCE & INNOVATION"
    },
    {
      img: "./assets/images/letters.jpg",
      title: "How monks helped invent sign language",
      category: "HISTORY MAGAZINE"
    },
    {
      img: "./assets/images/elephant.jpg",
      title: "Where humans suffer, so do elephant",
      category: "ANIMALS"
    },
  ]


  return <div className="col-lg-4 col-md-12 order-2 order-lg-1 mb-5">
    <h2 className="ng-explore-stories-head text-light mb-5"><span></span>LATEST STORIES</h2>
    <div className="row">
      {stories.map((story, index) => {
        return <div className="col-lg-12 col-md-6 d-flex mb-3">
          <div
            className="ng-explore-story-img mr-3"
            style={{
              backgroundImage: `url(${story.img})`
            }}>
          </div>
          <div className="ng-explore-story-desc d-flex flex-column">
            <span className="text-light mb-1">{story.category}</span>
            <h5 className="text-light">{story.title}</h5>
          </div>
        </div>
      })}
    </div>
  </div>
}

const ExploreArticle = () => {

  const articles = [
    {
      img: "./assets/images/everest-crowd.jpg",
      title: "Traffic jams are just one of the problems facing climbers on Everest",
      category: "EXPLORATION & ADVENTURE"
    },
    {
      img: "./assets/images/bath-river.jpg",
      title: "First global look finds most rivers awash with antibiotics",
      category: "ENVIRONMENT"
    },
    {
      img: "./assets/images/nuclear-fusion.jpg",
      title: "Cold fusion remains elusive—these scientists may revive the quest",
      category: "SCIENCE & INNOVATION"
    },
  ]

  return <div className="col-lg-8 col-md-12 order-1 order-lg-2 mb-5">
    <div className="row mb-3">
      <div className="col-sm-12 c-pointer">
        <div
          style={{
            backgroundImage: `url(${articles[0].img})`,
            height: `400px`
          }}
          className="ng-explore-article-img p-3 d-flex flex-column justify-content-end">
          <h6 className="text-light">{articles[0].category}</h6>
          <h4 className="text-light">{articles[0].title}</h4>
          <h6 className="text-light"><i className="fas fa-bars mr-2"></i>READ</h6>
        </div>
      </div>
    </div>
    <div className="row">
      {articles.slice(1).map((article, index) => {
        return <div key={index} className="col-md-6 col-sm-12 mb-3 d-flex flex-column c-pointer">
          <div
            style={{
              backgroundImage: `url(${article.img})`,
              height: `200px`
            }}
            className="ng-explore-article-img">
          </div>
          <div className="ng-explore-article-desc">
            <h6 className="text-secondary">{article.category}</h6>
            <h4 className="text-dark">{article.title}</h4>
            <h6 className="text-dark"><i className="fas fa-bars mr-2"></i>READ</h6>
          </div>
        </div>
      })}
    </div>
  </div>
}