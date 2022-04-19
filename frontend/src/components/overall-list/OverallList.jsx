import React, { useEffect, useState } from 'react'
import './overall-list.scss'
import { data } from '../../constants'
import { userRequest } from "../../utils/CallApi";
import { currentChange } from '../../utils/const';

const icons = [
    <i className='bx bx-receipt'></i>,
    <i className='bx bx-user'></i>,
    <i className='bx bx-cube'></i>,
    <i className='bx bx-dollar'></i>
]

const OverallList = () => {
    const [overallList, setOverallList] = useState([]);
    useEffect(() => {
        userRequest().get ('admin/reports/overall').then (res => {
            res.data[3].value = currentChange(res.data[3].value)
            setOverallList (res.data);
          });
    }, []);
    return (
        <ul className='overall-list'>
            {
               overallList.map((item, index) => (
                    <li className="overall-list__item" key={`overall-${index}`}>
                        <div className="overall-list__item__icon">
                            {icons[index]}
                        </div>
                        <div className="overall-list__item__info">
                            <div className="title">
                                {item.value}
                            </div>
                            <span>{item.title}</span>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default OverallList
