import React from "react";

const ToggleLanguage = () => {
  // const { localLanguage } = useSelector((store) => store.language);
  // const [selectLanguage, setSelectLanguage] = useState(localLanguage);
  // const handleChange = (event) => {
  //   setSelectLanguage(event.target.value);
  //   dispatch(changeLocalLanguage(event.target.value, [], "push"));
  // };

  return (
    <div>
      {" "}
      {/* ========================== */}
      {/* <Select
labelId="demo-simple-select-label"
id="demo-simple-select"
label="Language"
value={selectLanguage}
onChange={handleChange}
variant="standard"
>
<MenuItem value="fr">
  <img src={flagFr} style={{ width: "30px" }} alt={"flagFr"} />
</MenuItem>

<MenuItem value="en">
  <img src={flagEn} style={{ width: "30px" }} alt={"flagEn"} />
</MenuItem>

<MenuItem value="de">
  <img src={flagDe} style={{ width: "30px" }} alt={"flagDe"} />
</MenuItem>
<MenuItem value="es">
  <img src={flagEs} style={{ width: "30px" }} alt={"flagEs"} />
</MenuItem>
</Select> */}
    </div>
  );
};

export default ToggleLanguage;
