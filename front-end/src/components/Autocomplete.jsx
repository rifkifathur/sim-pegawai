import React, { useEffect, useRef, useState } from 'react';

const Autocomplete = ({ suggestions, handleComplete }) => {
    const ref = useRef();
    const [suggest, setSuggest] = useState([]);
    const [drop, setDrop] = useState(false);
    const [Uinput, setUinput] = useState('');

    useEffect(() => {
        const outside = (e) => {
            if (drop && ref.current && !ref.current.contains(e.target)) {
                setDrop(false);
            }
        }
        document.addEventListener("click", outside);

        return () => {
            document.removeEventListener("click", outside);
        }
    }, [drop])

    const handleSuggest = (e) => {
        const unLinked = suggestions.filter((item) =>
            item.nik.indexOf(e.target.value) > -1
        );
        setSuggest(unLinked);
        setDrop(true);
        setUinput(e.target.value);
    }

    const handleShowSuggest = (e) => {
        handleComplete(e)
        setUinput(e.nik);
    }

    return (
        <>
            <input type="text"
                onChange={handleSuggest}
                ref={ref}
                value={Uinput}
            />
            {drop &&
                <ul className='absolute left-44 top-8 w-[175px] bg-red-200 border-md border-slate-400'>
                    {suggest.map(item => {
                        return (
                            <div key={item.nik} className="border-b border-slate-400" onClick={() => handleShowSuggest(item)}>
                                <li>{item.nik}</li>
                                <li>{item.nama_pegawai}</li>
                            </div>
                        )
                    })}
                </ul>
            }
        </>
    );
};

export default Autocomplete;