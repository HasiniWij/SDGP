import React, { Component} from 'react'; 
import './answer.css';
import {BrowserRouter as Router, Link, NavLink, Route} from 'react-router-dom';
import axios from 'axios';

export class Answer extends Component {
    constructor(props){
        super(props)
        this.state={
            posts:[],
            errormsg:"",
            urfull:"",
            query:"",
        }
    }
    componentDidMount(){
        //axios.get("https://jsonplaceholder.typicode.com/posts")
        axios.get(this.props.location.state.urlfull)
        .then(response =>{
            console.log(response)
            this.setState({posts: response.data})
            this.setState({query:this.props.location.state.query})
        })
        .catch(error =>{
            console.log(error)
            this.setState({urfull:this.props.location.state.urlfull}) //test
            this.setState({errormsg:"Invalid Request"})
        })
    }

    render(){
        const {posts, errormsg, query,urfull} = this.state
        return (
         <div className="searchans">
             { errormsg? <div className="seatitle">{errormsg}</div> : null}
             <div className="seatitle">Results: {query}</div>
             {
                 posts.length ?
                 posts.map(post => <div className="spieces" key={post.pieceIndex}>
                     <span style={{fontSize: "16px", color:"rgba(182,166,139,1)", }}>{post.pieceTitle} - {post.legislationName}</span><br/>
                     <span style={{fontSize: "15px", color:"white", marginTop:"4px"}}>{post.content}</span>
                    <div className="searchlinks">
                        <NavLink className="menulink" to={{pathname:`/simplify/${post.pieceIndex}`, state:{urlfull:"http://localhost:5000/simplifiedpiece/"+post.pieceIndex, 
                        pindex:post.pieceIndex, content:post.content, title:post.pieceTitle, legno:post.legislationIndex,name:post.legislationName}}}>
                         SIMPLIFY</NavLink>

                         <Link className="sealeglink" to ={{pathname:"/legislation", 
                        state:{urlfull: "http://localhost:5000/legislation/"+post.legislationIndex, 
                        in:post.legislationIndex, name:post.legislationName}}}>SEE FULL LEGISLATION</Link>
                    </div>            
                    </div>) :
                 null
             }
        </div>
    )
    }
}
export default Answer
