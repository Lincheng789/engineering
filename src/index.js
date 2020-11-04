import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class RepoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { repos: [] ,url:'',url2:'',loading:true};
    }
    changeUrl=(e)=>{
        console.log('====================================');
        console.log(e);
        console.log('====================================');
        this.setState({url:e ,loading:true})
    }
    //+language:javascript
    async componentDidMount() {
        const res = await axios.get(`https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories`);
        this.setState({
            repos: res.data.items,
            loading:false
        })
        this.props.onRef(this)
    }
    async componentDidUpdate() {
        const { url ,repos,url2} = this.state
        
       if (url2!==url) {
        const res = await axios.get(`https://api.github.com/search/repositories?q=stars:%3E1${url}&sort=stars&order=desc&type=Repositories`);
            this.setState({
            repos: res.data.items,
            url2:url,
            loading:false
        })
       }
    }
    render() {
        const { loading } = this.state
        var i=0;
        const list = this.state.repos.map((item, key) => {
            i+=1
        return <div key={item.id} style={{display:'flex',flex:'25%',justifyContent: 'center'}} >
            <div  style={{ display: 'flex',flexDirection:'column',listStyleType:'none',margin: '0 10px 10px',backgroundColor:'#e8e8e8',width:'280px'}}>
                <h3 style={{textAlign:'center'}}>#{i}</h3>
               <img src={item.owner.avatar_url}  alt='' width='50%'style={{margin:'20px auto'}}/>
                <li ><h3 style={{textAlign:'center',color:'red'}}>{item.name}</h3></li>
                <li style={{margin: '10px 0px 10px 10px'}}><svg t="1599140298208" class="icon" viewBox="0 0 1032 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4652" width="30" height="30" style={{margin:'0px 10px 0px 5px',verticalAlign:'middle'}}><path d="M494.870476 507.635572c160.939766 0 291.404485-111.604041 291.404485-249.237064 0-137.664224-130.464718-249.229265-291.404485-249.229265-160.924166 0-291.412285 111.56504-291.396684 249.229265 0 137.633024 130.472518 249.237065 291.404485 249.237064zM628.455241 590.737994H385.59087c-207.888657 0-376.433535 144.122719-376.433535 321.910733v20.779506c0 72.665868 168.544878 72.736069 376.433535 72.736069H628.455241c207.865256 0 376.402334-2.683239 376.402334-72.736069v-20.771705c0-177.795814-168.521478-321.918533-376.402334-321.918534z" p-id="4653" fill="#1296db"></path></svg> <a href={item.html_url} alt='' style={{textDecoration:'none'}}><h4 style={{display:'inline',margin:'auto 0px'}}>{item.name}</h4></a></li>
                <li style={{margin: '10px 0px 10px 10px'}}><svg t="1599140620542" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5562" width="30" height="30" style={{margin:'0px 10px 0px 5px',verticalAlign:'middle'}}><path d="M512 61.44l-29.44 70.08L380.928 372.48l-317.44 34.56 237.44 224-67.52 330.432L512 792l278.272 169.472-67.264-330.496 237.248-224-317.248-34.496z m0 164.8L598.72 432l217.024 23.488-162.496 153.536 44.992 221.44L512 717.056l-186.496 113.536 45.248-221.504-162.24-153.536 216.768-23.488z" fill="#f4ea2a" p-id="5563"></path></svg><h4 style={{display:'inline'}}>{item.id}{' stars'}</h4></li>
                <li style={{margin: '10px 0px 10px 10px'}}><svg t="1599140892610" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6084" width="30" height="30" style={{margin:'0px 10px 0px 5px',verticalAlign:'middle'}}><path d="M951 799.49l-383.89-651a64 64 0 0 0-110.26 0L73 799.49C47.83 842.16 78.59 896 128.12 896h767.77c49.52 0 80.28-53.84 55.11-96.51zM128.12 832l383.62-651a1 1 0 0 1 0.26 0l383.89 651z" p-id="6085" fill="#1296db"></path><path d="M470 393.88l8.59 244.51a33.18 33.18 0 0 0 66.31 0.06L554 394a42 42 0 1 0-84-0.08z" p-id="6086" fill="#1296db"></path><path d="M512 758.4m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z" p-id="6087" fill="#1296db"></path></svg><h4 style={{display:'inline'}}>{item.owner.id}{' forks'}</h4></li>
            </div>                  
        </div>
       } );
        console.log(this.state.repos);
        return <div  style={{display:'flex',width: '1200px',flexWrap:'wrap',justifyContent: 'center',margin: '0 auto',lastChild:''}}>
            {loading?
            <img src="loading.gif" alt=""/>:list}
        </div>;
    }
}
class App extends React.Component {
    changeUrlP = (e) =>{
        this.RepoList.changeUrl(e)
    }
    onRef = (ref) => {
        this.RepoList = ref
    }
   
    render() { console.log('123');
        return <div>
            <li class="nav" style={{display:'flex',justifyContent: 'center',listStyleType:'none',margin:'30px auto'}}>
            <div style={{cursor: 'pointer',marginRight:'10px',fontWeight:'bold',fontSize:'20px'}} onClick={()=>this.changeUrlP('')}>ALL1</div>
            <div style={{cursor: 'pointer',marginRight:'10px',fontWeight:'bold',fontSize:'20px'}} onClick={()=>this.changeUrlP('+language:javascript')}>JavaScript</div>
            <div style={{cursor: 'pointer',marginRight:'10px',fontWeight:'bold',fontSize:'20px'}} onClick={()=>this.changeUrlP('+language:ruby')}>Ruby</div>
            <div style={{cursor: 'pointer',marginRight:'10px',fontWeight:'bold',fontSize:'20px'}} onClick={()=>this.changeUrlP('+language:java')}>Java</div>
            <div style={{cursor: 'pointer',marginRight:'10px',fontWeight:'bold',fontSize:'20px'}} onClick={()=>this.changeUrlP('+language:css')}>CSS</div>
            <div style={{cursor: 'pointer',fontWeight:'bold',fontSize:'20px'}}onClick={()=>this.changeUrlP('+language:Python')}>Python</div>
            </li>
            <RepoList onRef={this.onRef} />
           
        </div>
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('container')
)