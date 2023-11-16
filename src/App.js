import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [quote, setQuote] = useState();
  const [author, setAuthor] = useState();
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    const getQuote = async () => {
      const result = await fetch("https://api.quotable.io/rando")
      if(result.status !== 404){
      result.json().then(json => {
            setQuote(json.content);
            setAuthor(json.author);
      })
    }else{
      alert('API did not load please try again later.')
      setIsloading(false);
      setQuote("Quote cannot load.")
      setAuthor("Author cannot load.")
    }
  }
  if(isloading !== false){
    try{
    getQuote();
    setIsloading(false)
    }catch(err){
      console.log(`Api did not load please try again later. ErrorCode: ${err}`);
    }
  }
  console.log(isloading);
    }, [isloading])
  return (
    <div className="App">
        <p>Lets Hear a quote!</p>
        <p>Quote: {quote}</p>
        <p>Author: {author}</p>
        <div className="btnContainer">
        <button className="QuoteBTN" onClick={() => setIsloading(!isloading)}>New Quote</button>
        </div>
    </div>
  );
}

export default App;
