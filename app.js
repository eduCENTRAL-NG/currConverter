//list of countries

const CountryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
  };

//logic code starts from here
  const base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
  
  const fromcurr = document.querySelector(".from select");
  const tocurr = document.querySelector(".to select")
  const button = document.querySelector("form button");
  const dropdowns = document.querySelectorAll(".dropdown select");
  const val = document.querySelector(".value")
  const msg = document.querySelector(".msg")
  const exchangeArrow = document.getElementById('exchangeArrow');
  
  for (let select of dropdowns) {
    for (curcode of Object.keys(CountryList)) {
      let newOption = document.createElement("option")
      newOption.innerText = curcode
      newOption.value = curcode;
      if (select.name === "From" && curcode === "GBP") {
        newOption.selected = "selected"
      }
      if (select.name === "to" && curcode === "NPR") {
        newOption.selected = "selected"
      }
      select.append(newOption)
    }
    select.addEventListener("change", (evt) => {
      updateFlag(evt.target)
    })
  
  }
  
  const updateFlag = (element) => {
    let currcode = element.value
    let countrycode = CountryList[currcode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
  };
  
  
  button.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amt = document.querySelector(".amount input");
    let amtval = amt.value;
    // If the input amount is empty or less than 1, set it to 1
    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amt.value = 1;
    }
    
    // Constructing the URL for fetching exchange rates
    const url = `${base_URL}/${fromcurr.value.toLowerCase()}.json`;
    
    // Fetching exchange rate data
    let response = await fetch(url);
    let data = await response.json();
    
    // Getting the exchange rate from the fetched data
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    
    // Calculating the exchanged amount
    let exchange = rate * amtval;
    
    // Displaying the result
    msg.innerText = `${amtval} ${fromcurr.value} = ${exchange} ${tocurr.value}`;
    console.log(exchange);
    
    // Checking if the response status is successful
    if (response.status === 200) {
        console.log("Conversion Success");
    } else {
        console.log("Error");
    }
});

  
  exchangeArrow.addEventListener("click", () => {
    // Swaps Currency Codes
    let temp = fromcurr.value;
    fromcurr.value = tocurr.value;
    tocurr.value = temp;
  
    // Swaps Flag Images
    let fromFlagImg = fromcurr.parentElement.querySelector('img');
    let toFlagImg = tocurr.parentElement.querySelector('img');
    let tempSrc = fromFlagImg.src;
    fromFlagImg.src = toFlagImg.src;
    toFlagImg.src = tempSrc;
  });
  
  
  
  
  exchangeArrow.addEventListener('mouseover', () => {
    exchangeArrow.style.backgroundColor = '#ccc'; //  hover color
  });
  
  exchangeArrow.addEventListener('mouseout', () => {
    exchangeArrow.style.backgroundColor = '#ddd'; // default color
  });
  

  