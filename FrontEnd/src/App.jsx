import { useState } from 'react'

const Button = ({ text, isActive, onClick }) => {
  const base = 'w-[160px] rounded-t-lg py-2 px-5 text-[18px] font-semibold';
  const buttonStyle = isActive
    ? `${base} bg-white border-x-2 border-t-2 border-solid border-gray-300 z-10`
    : `${base} hover:bg-gray-300 hover:text-blue-500 hover:text-[20px] z-1`;

  return (
    <button className={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
};

function App() {

  const [active, setActive] = useState('Encode');
  const [inputValue, setInputValue] = useState('');
  const [url, setUrl] = useState('');
  const [back, setBack] = useState('');
  const [link, setLink] = useState('');

  const changeUrl = (e) => {
    setUrl(e.target.value);
  };

  const changeBack = (e) => {
    setBack(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    let fUrl = url;
    let fBack = back;

    e.preventDefault();
    if(fUrl === '') {
      alert('Please enter a valid URL');
      return;
    }


    //Check if url contains http or https, if it does remove it and store it in a variable
    let protocol = '';
    if(fUrl.includes('http://')) {
      protocol = 'http://';
      fUrl = fUrl.replace('http://', '');
    } else if(url.includes('https://')) {
      protocol = 'https://';
      fUrl = fUrl.replace('https://', '');
    }

    //Check if url contains www, if it does remove it and store it in a variable
    let www = '';
    if(fUrl.includes('www.')) {
      www = 'www.';
      fUrl = fUrl.replace('www.', '');
    }

    const urlRegex = /^([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(?:\/[^\s]*)?$/;

    if(!urlRegex.test(fUrl)) {
      alert('Please enter a valid URL');
      return;
    }

    fUrl = (protocol || 'http://') + 'www.' + fUrl;

    if(fBack === '') {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      const charactersLength = characters.length;
      for (let i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      fBack = result;
    }
    
    fetch('https://swiftlink.onrender.com/available/' + fBack, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(data => {
      if(!data){
        alert('Back already exists, change it');
        return;
      }else{
        fetch('https://swiftlink.onrender.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        shortened: fBack,
        link: fUrl
      })
    }).then(res => res.json())
    .then(data => {
      if(data) {
        setLink('https//swiftlink.onrender/' + data.shortened);
      }
    })
      }
    })
  }

  const copyLink = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard');
  };

  const copyBtnStyles = `bg-gray-200 rounded-md px-2 py-1 border-2 border-solid border-gray-400 ${link.length > 0 ? '' : 'hidden'}`

  const encode = () => {
    setActive('Encode');
  };

  const decode = () => {
    setActive('Decode');
  };


  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center
      bg-gray-200">
        <span className='top-20 text-5xl font-bold bg-gradient-to-r from-purple-600 to-red-600 text-transparent bg-clip-text'>SwiftLink</span>
        <div className=' mt-[20px] h-[1px] bg-black w-[400px]'></div>
        <span className='text-3xl font-semibold mt-5'>Streamline Your  
        <span className='bg-gradient-to-l from-green-600 to-blue-600 text-transparent bg-clip-text font-bold'> Links</span> Effortlessly</span>
        <div className='w-[320px] flex justify-center mt-[50px]'>
            <Button text="Shorten URL" isActive={active === 'Encode'} onClick={encode} />
        </div>
        <div className='bg-white w-[800px] rounded-lg
        border-2 border-solid border-gray-300 mt-[-1.6px] z-2 p-10'>
          {active === 'Encode' ? (
            <>
            <form className='flex flex-col items-center gap-2'>
              <div className='flex justify-center gap-5 h-12 w-[700px]'>
                <span className='text-2xl font-bold h-full items-center flex justify-center'>Enter the URL : </span>
                <input type='url' className='border border-solid w-[500px] rounded-lg outline-none px-3 border-gray-600' placeholder='Enter you url' onChange={(e) => changeUrl(e)}></input>
              </div>
              <div className='flex-col w-full'>
                <div className='text-xl font-bold mx-4 '>Domain</div>
                <div className='flex items-center mt-1'>
                <div className='border-2 border-solid border-gray-300 h-12 rounded-lg w-fit mx-4 bg-gray-200 flex items-center p-4'>
                  swiftlink.onrender
                </div>
                <span className='flex justify-center items-center text-[20px] w-fit'>/</span>
                <input type='url' className=' h-12 border border-solid w-full rounded-lg outline-none px-3 border-gray-600 mx-4' placeholder='Enter a back(optional)' onChange={(e) => changeBack(e)}></input>
                </div>
              </div>
              <button className='bg-blue-500 w-[160px] mx-4 mt-6 h-[50px] rounded-lg text-xl font-semibold' type="submit" 
              onClick={(e) => handleSubmit(e)}>Generate</button>
            </form>
            <br />
            <div className='flex justify-center gap-4'>
              <a href={link} className='text-lg text-blue-700 underline
              flex justify-center items-center'>{link}</a>
              <button className={copyBtnStyles} onClick={(e) => copyLink(e)}>Copy</button>
            </div>
            </>
          ) : (
            <input
              className='w-[700px] h-[50px] rounded-lg border-2 border-solid border-gray-300 mt-5 ml-5'
              type="text"
              placeholder="Enter URL to decode"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default App
