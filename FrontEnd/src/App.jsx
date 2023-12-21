import { useState } from 'react'

const Button = ({ text, isActive, onClick }) => {
  const base = 'w-[150px] bg-gray-300 rounded-t-lg py-4 px-5';
  const buttonStyle = isActive
    ? `${base} border-x-2 border-t-2 border-solid border-black z-10`
    : `${base} z-1`;

  return (
    <button className={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
};

function App() {

  const [active, setActive] = useState('Encode');
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const encode = () => {
    // Implement URL shortening logic here
    setOutputValue('Shortened URL');
    setActive('Encode');
  };

  const decode = () => {
    // Implement URL decoding logic here
    setOutputValue('Decoded URL');
    setActive('Decode');
  };


  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <div className='w-[300px] flex justify-between'>
            <Button text="Shorten URL" isActive={active === 'Encode'} onClick={encode} />
            <Button text="Decode URL" isActive={active === 'Decode'} onClick={decode} />
        </div>
        <div className='bg-gray-300 h-[300px] w-[800px] rounded-lg
        border-2 border-solid border-black mt-[-1.6px] z-2'>
        </div>
      </div>
    </>
  )
}

export default App
