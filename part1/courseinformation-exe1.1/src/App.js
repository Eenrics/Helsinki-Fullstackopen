const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const Header = (props) => {
    return ( 
      <h1>{props.course}</h1>
     );
  }
   
  const Content = ({firArg, secArg, thrArg}) => {
    return (  
      <>
        <p>
          {firArg.part1} {firArg.exercises1}
        </p>
        <p>
          {secArg.part2} {secArg.exercises2}
        </p>
        <p>
          {thrArg.part3} {thrArg.exercises3}
        </p>
      </>
    );
  }
    
  const Total = (props) => {
    return ( 
      <p>Number of exercises {props.exercisesSum}</p>
     );
  }
 

  return (
    <div>
      <Header course={course} />
      <Content firArg={{part1, exercises1}} secArg={{part2, exercises2}} thrArg={{part3, exercises3}}/>
      <Total exercisesSum={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App