import axios from "axios";
import React from "react";

export default class ReviewList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            reviews: [],
            type: props.type
        }
    }
    loadReviews=async()=>{
        const response= await axios.get("http://localhost:8000/reviews", {
            params: {
                type: this.state.type
            }
        })
        this.setState(prevState=>({
            ...prevState,
            reviews: response.data.reviews
        }))
    }

    componentDidMount(){
        this.loadReviews();
    }

    render(){
        return(
            <div>
                {this.state.reviews.map((review) => {
                    return(
                        <div>
                            <p>rating: {review.rating}/5</p>
                            <p>{review.text}</p><br/>
                        </div>
                    )
                })}
            </div>
        )
    }
}