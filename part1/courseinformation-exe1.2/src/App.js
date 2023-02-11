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
        <Part part={firArg.part1} exercises={firArg.exercises1} />
        <Part part={secArg.part2} exercises={secArg.exercises2} />
        <Part part={thrArg.part3} exercises={thrArg.exercises3} />
      </>
    );
  }

  const Part = (props) => {
    return ( 
      <p>
        {props.part} {props.exercises}
      </p>
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