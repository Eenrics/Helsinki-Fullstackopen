import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return ( 
    <button onClick={handleClick}>{text}</button>
   );
}
 

const Display = ({handleBad, handleGood, handleNeutral}) => {
  return ( 
    <>
      <h1>give feedback</h1>
      <Button text="good" handleClick={handleGood} />
      <Button text="neutral" handleClick={handleNeutral} />
      <Button text="bad" handleClick={handleBad} />
    </>
   );
}

const StatisticLine = ({text, value}) => {
  return ( 
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
   );
}
 

const Statistics = ({good, neutral, bad}) => {
  let sum = good + neutral + bad

  if (!sum) return <p>No feedback given </p>

  return ( 
    <table>
      <h2>statistics</h2>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={sum} />
      <StatisticLine text="average" value={((good * 1) + (bad * -1)) / sum} />
      <StatisticLine text="positive" value={`${(good * 100) / sum} %`}/>
    </table>
   );
}
 

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleBad = () => setBad(bad + 1)
  const handleNeutral = () => setNeutral(neutral + 1)

  return (
    <div>
      <Display 
        handleBad={handleBad}
        handleGood={handleGood}
        handleNeutral={handleNeutral}
      />
      <Statistics 
        good={good} 
        bad={bad} 
        neutral={neutral} 
      />
    </div>
  )
}

export { Display };
export default App