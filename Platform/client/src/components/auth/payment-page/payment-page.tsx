import React, { useState, useEffect } from 'react';
import './payment-page.css';
import { useNavigate } from 'react-router-dom';
import { FaCcPaypal } from "react-icons/fa6";
import { FaCcMastercard } from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";
import { FaCcDiscover } from "react-icons/fa";
import { FaCcJcb } from "react-icons/fa";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function PaymentPage() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [hasSteam, setSteam] = useState(false);

  useEffect(() => {
    // Fetch and check Steam ID when component mounts or userEmail changes
    fetch('http://localhost:3001/checksteamid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail: cookies.get('USER_DATA')?.email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSteam(data.hasSteamID); // Set hasSteam based on the response
      })
      .catch((error) => {
        console.error('Error checking Steam ID:', error);
      });
  }, [cookies.get('USER_DATA')?.email]);

  const setPaymentStatusAndVM = () => {
    setLoading(true);
    fetch('http://localhost:3001/setpaiduser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail: cookies.get('USER_DATA')?.email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setLoading(false);
          if (hasSteam) {
            window.location.href = '/';
          } else {
            window.location.href = '/steam-login'
          }
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error('There was a problem with the fetch operation:', error);
      });
  };


  return  <div id='backbox'>

  <div id='box'>
  <div id="info-steam-connect">
  <h2>Subscribe now</h2>
  <p> And enjoy 20h of high quality gaming per month</p>
  <div id='login-create-account'>
        <p className="small-notification">Continue without subscription</p>
        <a className="small-notification" href='./'>Skip</a>
        {isLoading && <p className='small-notification-setup'>Setting up gaming machine</p>}
       
      </div>
  </div>

    <div id='steambutton'>
    
      <div>
        <FaCcPaypal id='paypal' onClick={setPaymentStatusAndVM}/>
        <div className="icon-cards">
          <FaCcMastercard className='card' />
          <SiAmericanexpress className='card'/>
          <FaCcDiscover className='card'/>
          <FaCcJcb className='card'/>
        </div>
      </div>
      <div id='steam-container-subscribe'>        
               
         
          {isLoading && 
          <div className = 'loader-subscribe'> </div>
        }
    </div>
      


      </div>
    </div>
</div>
}

export default PaymentPage