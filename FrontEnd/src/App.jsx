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
        <span className='absolute top-20 text-5xl font-bold bg-gradient-to-r from-purple-600 to-red-600 text-transparent bg-clip-text'>SwiftLink</span>
        <div className=' mt-[50px] h-[1px] bg-black w-[400px]'></div>
        <span className='text-3xl font-semibold mt-5'>Streamline Your  
        <span className='bg-gradient-to-l from-green-600 to-blue-600 text-transparent bg-clip-text font-bold'> Links</span> Effortlessly</span>
        <div className='w-[320px] flex justify-center mt-[50px]'>
            <Button text="Shorten URL" isActive={active === 'Encode'} onClick={encode} />
        </div>
        <div className='bg-white h-[300px] w-[800px] rounded-lg
        border-2 border-solid border-gray-300 mt-[-1.6px] z-2 p-10'>
          {active === 'Encode' ? (
            <form className='flex flex-col gap-2'>
              <div className='flex justify-center gap-5 h-12'>
                <span className='text-2xl font-bold h-full items-center flex justify-center'>Enter the URL : </span>
                <input type='url' className='border border-solid w-[500px] rounded-lg outline-none px-3 border-gray-600' placeholder='Enter you url'></input>
              </div>
              <div className='flex-col'>
                <div className='text-xl font-bold mx-4 '>Domain</div>
                <div className='flex items-center mt-1'>
                <div className='border-2 border-solid border-gray-300 h-12 rounded-lg w-fit mx-4 bg-gray-200 flex items-center p-4'>
                  swiftlink.onrender
                </div>
                <span className='flex justify-center items-center text-[20px] w-fit'>/</span>
                <input type='url' className=' h-12 border border-solid w-[500px] rounded-lg outline-none px-3 border-gray-600 mx-4' placeholder='Enter a back(optional)'></input>
                </div>
              </div>
            </form>
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
