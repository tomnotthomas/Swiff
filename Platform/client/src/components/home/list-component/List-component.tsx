import ListItemBig from "../listitem-big-component/listitem-big-component.tsx";
import ListItem from "../listitem-component/Listitem-component.tsx"
import './list-component.css'

//games.results
function List ({games}) {
  if (!games) {
    return <div>Still loading the games...</div>;
  }
  if(games.results && games.results.length <= 4){
    return (
      <div className= 'list-row'>
        <div className='list-big' >
          <>
            {games.results &&
                games.results.map((game: any) => (
                  <ListItemBig key={game.id} game={game} />
            ))}
          </>
        </div>
      </div>
    )} else {
      return (
        <div className= 'list-row'>
          <div className='list' >
            <>
            {games.results &&
              games.results.map((game: any) => (
                <ListItem key={game.id} game={game} />
              ))}
           </>
          </div>
       </div>
      )
    }
  }


export default List