
import img from '../assets/new-dex.png'
export function ListItem({name, url}: {name: string, url: string}) {
    return ( 
        <div className=" w-full h-[20%]  flex flex-row">
            <img src={img} className=" w-[29%] h-auto"/>
            <p>{name}</p>
        </div>
     );
}
