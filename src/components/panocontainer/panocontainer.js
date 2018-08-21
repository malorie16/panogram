import React from 'react'
import { connect } from 'react-redux'
import { getPanos, selectedPano, getPano, addComment, addLike, like, getComments } from '../../actions/actions.js'
import { Link, withRouter } from 'react-router-dom'
import Likes from './likes.js'

class PanoContainer extends React.Component {

  state = {
    userId: '',
    pano: {
      id: '',
      pano_url: '',
      caption:''
    },
    comment: '',
    comments: this.props.comments || [],
    render: true
  }

  componentDidMount () {

    // this.props.getComments()
    // this.setState({
    //   comments: this.props.allComments
    // })
 }

 //sends user to vr page when 'View in vr' is clicked
 handleVR = () => {
   this.props.selectedPano({pano: {id: this.props.pano.id, pano_url: this.props.url, caption: this.props.caption}})
   this.props.history.push(`/vr`)
 }

 //renders comments
 // renderComments = () => {
 //   if (!this.state.comments) {
 //     return
 //   } else {
 //     const coms = this.state.comments.map(comment => {
 //       console.log(comment.comment);
 //       const date = new Date(comment.comment.created_at)
 //       if (comment.pano.id === this.props.id)
 //      return <li>{date.toDateString()}: {comment.comment} </li>
 //    })
 //    return coms.reverse()
 //    }
 //  }
 //
 //  commentCond = () => {
 //    if (this.props.history.location.pathname === '/profile') {
 //      return this.props.comments
 //    } else {
 //      return this.renderComments()
 //    }
 //  }



//makes comment input a controlled field
 handleText = (e) => {
   this.setState({
     comment: e.target.value
   })
 }

//clears comment form
 resetForm = (e) => {
   this.setState({
     comment: ''
   })
 }

 //makes POST request when comment form submits
 handleSubmit = (e) => {
   e.preventDefault()
   // const arr = this.state.comments.concat(e.target.value)
   const date = new Date().toDateString()
   this.setState({
     comments: this.state.comments.concat(date + ':' + ' ' + this.state.comment)
   })
   this.props.addComment({comment: this.state.comment, pano_id: this.props.id})
   this.resetForm(e)
 }

 render() {
   // debugger
   console.log('pano id:', this.props.id);
   console.log('comment props:', this.props.comments);
   console.log('comments state:', this.state.comments);
    return(
      <div className='card-container'>
        <div className="card large">
          <div className="card-image waves-effect waves-block waves-light">
            {/*pano*/}
            <img className="activator" src={this.props.url}/>
          </div>
          {/*pano card slid down*/}
          <div className="card-content">
            {/*like button*/}
            <Likes panoId={this.props.id} likes={this.props.likes} likeId={this.props.likeId}/>
            <span className="card-title activator grey-text text-darken-4">{this.props.caption}<i className="material-icons right">more_vert</i></span>
            {/*VR button*/}
            <p><Link to='/vr' onClick={this.handleVR}>View in VR</Link></p>
            {/*comment form*/}
             <div>Add Comment: <form id='comment-form' onSubmit={this.handleSubmit} >
               <input className='comment-field' type='text' value={this.state.comment} onChange={this.handleText} >
               </input><input type='submit' onClick={this.setComments}></input>
              </form>
            </div>
         </div>
         {/*pano card slid up*/}
         <div className="card-reveal">
           <span className="card-title grey-text text-darken-4">{this.props.user}<i className="material-icons right">close</i></span>
           <p>{this.props.date}</p>
           <ul>
             {this.state.comments}
           </ul>
         </div>
       </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    clickedUser: state.clickedUser,
    clickedPano: state.clickedPano,
    allComments: state.allComments,
    oneLike: state.oneLike
  }
}

export default withRouter(connect(mapStateToProps, { getPanos, selectedPano, getPano, addComment, addLike,like, getComments })(PanoContainer))
