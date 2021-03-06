const callPeople = (page, main) => {

  fetch(`https://swapi.co/api/${page}/`)
  .then(res => res.json())
  .then(data => {

  const homeworld = data.results.map(i =>
    fetch(i.homeworld)
    .then(res => res.json())
    .then(home => {
      return home.name
    })
  )

  const species = data.results.map(i =>
    fetch(i.species)
    .then(res => res.json())
    .then(spec => {
      return spec.name
    })
  )

  const population = data.results.map(i =>
    fetch(i.homeworld)
    .then(res => res.json())
    .then(popul => {
      return popul.population
    })
  )

  Promise.all(homeworld)
    .then(callback => {
      // console.log('callback', callback)
      return callback.map((home, i) => {
        return Object.assign(data.results[i], {homeworld: home})
      })
    })

  Promise.all(species)
    .then(callback => {
      return callback.map((spec, i) => {
        return Object.assign(data.results[i], {species: spec})
      })
    })

  Promise.all(population)
    .then(callback => {
      // console.log('callback pop:', callback)
      return callback.map((pop, i) => {
        return Object.assign(data.results[i], {population: pop})
      })
    })

    .then(value => {
      main.setState({people: value})
    })

  })
  .catch(error => console.log('error fetching people:', error))
}

export default callPeople;
