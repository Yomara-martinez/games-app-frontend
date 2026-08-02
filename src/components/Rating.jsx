import { GiStarKey } from "react-icons/gi";
import { GiSeaStar } from "react-icons/gi";

function Rating({rating}){
    return(
        <div className="rating">
            {[1,2,3,4,5].map((star)=>
            star <= rating ? (
                <GiSeaStar color="yellow"  key={star} />
            ) : (
                
                <GiSeaStar color="gray" key={star}/>
            ))}
        </div>
    )
}

export default Rating