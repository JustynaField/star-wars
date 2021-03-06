const callPlanets = (page, main) => {

  fetch(`https://swapi.co/api/${page}/`)
  .then(res => res.json())
  .then(data => {

    const residentsArr = data.results.map(planet => {

// console.log('i.residents', i.residents)
// console.log('data.results[i]', data.results[i])
      const residents = planet.residents.map(call =>
  // console.log('call', call)
      fetch(call)
      .then(resp => resp.json())
      .then(value => {
  // console.log('value:', value.name)
        return value.name
      })
        .catch(error => console.log('error fetching residents in planets:', error))
      )

// console.log('residents', residents)
    return Promise.all(residents)
    .then(values => {
      // console.log('values', values)
      return Object.assign(planet, {residents: values})
      })
    })

    return Promise.all(residentsArr)
  })

  .then(value =>
    main.setState({planets: value})
  )
  .catch(error => console.log('error fetching planets:', error))
}

export default callPlanets;
