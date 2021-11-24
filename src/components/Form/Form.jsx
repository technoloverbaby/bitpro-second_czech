import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Form.css";
import LoadingPage from "../reusable/LoadingPage/LoadingPage";

import zcash from "../../assets/zcash.png";
import ripple from "../../assets/ripple.png";
import grafik2 from "../../assets/grafik2.png";

function Form(props) {
  const url = new URL("https://cryp.im/api/v1/web/conversion");
  const ipForm = props.ipForm;

  let [redirectURL, setRedirURL] = useState("");

  let headers = {
    Authorization:
      "Bearer jNB0Sqebd8sRFpngSk0rLX8sVh7tTLFMmZau6RNQAKyWkxYAUUYqbByZjVF6",
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const [sent, setSent] = useState(false);
  const [data, setData] = useState({
    flow_hash: "6190be7ab827800024",
    landing: "Bitcoin Profit Page",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    ip: ipForm,
  });

  function submit(e) {
    e.preventDefault();
    Axios.post(
      url,
      {
        flow_hash: data.flow_hash,
        landing: data.landing,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        ip: data.ip,
      },
      {
        headers: headers,
      }
    ).then((res) => {
      setRedirURL(res.data.redirect_url);
      setSent(true);
    });
  }

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    console.log(newData);
    setData(newData);
  }

  // loader logic
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (!sent) {
    return (
      <div className="formPage">
        {loading ? (
          <LoadingPage loading={loading} />
        ) : (
          <div className="formInner">
            <div className="pageBG pageBG_1">
              <img src={zcash} alt="" />
            </div>
            <div className="pageBG pageBG_2">
              <img src={ripple} alt="" />
            </div>
            {/* <div className="pageBG pageBG_3">
              <img src={ltc} alt="" />
            </div>
            <div className="pageBG pageBG_4">
              <img src={btc} alt="" />
            </div> */}
            <div className="pageBG pageBG_grafik2">
              <img src={grafik2} alt="" />
            </div>
            <div className="formTitle title">регистрация аккаунта трейдера</div>
            <form className="form" onSubmit={(e) => submit(e)}>
              <input
                className="formInput formName"
                onChange={(e) => handle(e)}
                id="first_name"
                value={data.first_name}
                type="text"
                placeholder="Имя"
              />
              <input
                className="formInput formSurname"
                onChange={(e) => handle(e)}
                id="last_name"
                value={data.last_name}
                type="text"
                placeholder="Surname"
              />
              <input
                className="formInput formEmail"
                onChange={(e) => handle(e)}
                id="email"
                value={data.email}
                type="email"
                placeholder="Email"
              />
              <input
                className="formInput formPhone"
                onChange={(e) => handle(e)}
                id="phone"
                value={data.phone}
                type="tel"
                placeholder="Phone"
              />
              <div className="submitWrapper">
                <button type="submit" className="formSubmit">
                  регистрация
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  } else {
    return (window.location.href = redirectURL);
  }
}

export default Form;