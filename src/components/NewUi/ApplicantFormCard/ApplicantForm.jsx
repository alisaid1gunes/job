import { React, useEffect, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import "../../index.css";
import getAllCountries from "../../../services/getAllCountries";
import getCities from "../../../services/getCities";
import FileUploaderDrag from "./FileUploaderDrag";
import TextfieldItem from "./TexfieldItem";
import { useForm, Controller } from "react-hook-form";
import { validation } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveButton from "../SaveButton";
const ApplicantForm = (props) => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    age,
    setAge,
    email,
    setEmail,
    city,
    setCity,
    address,
    setAddress,
    phone,
    setPhone,
    jobTitle,
    setJobTitle,
    salaryExpectation,
    setSalaryExpectation,
    country,
    setCountry,
    setFile,
    gender,
    setGender,
    save,
  } = props.props;

  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const genderList = [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" },
  ];

  const getCountries = async () => {
    const countries = await getAllCountries();
    setCountryList(countries);
    console.log(countries);
  };

  const handleChange = (file) => {
    setFile(file);
  };

  const handleCountryChange = async (value) => {
    const countryCode = countryList.find(
      (country) => country.name === value
    ).iso2;
    setCountry(value);
    const cities = await getCities(countryCode);
    cities.sort();
    setCityList(cities);
  };
  const {
    register,
    control,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur", // "onChange"
    resolver: yupResolver(validation),
  });
  const onSubmit = (data) => {
    save();
  };

  useEffect(() => {
    getCountries();
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          md={12}
          spacing={2}
        >
          <TextfieldItem
            type={"text"}
            isSelect={false}
            value={firstName}
            setter={setFirstName}
            label={"First Name"}
            multiline={false}
            control={control}
            name={"firstName"}
            error={errors?.firstName}
          />
          <TextfieldItem
            type={"text"}
            isSelect={false}
            value={lastName}
            setter={setLastName}
            label={"Last Name"}
            multiline={false}
            control={control}
            name={"lastName"}
            error={errors?.lastName}
          />
          <TextfieldItem
            type={"number"}
            isSelect={false}
            value={age}
            setter={setAge}
            label={"Age"}
            multiline={false}
            control={control}
            name={"age"}
            error={errors?.age}
          />
          <TextfieldItem
            type={"text"}
            isSelect={true}
            selectList={genderList}
            value={gender}
            setter={setGender}
            label={"Gender"}
            multiple={false}
            control={control}
            name={"gender"}
            error={errors?.gender}
          />
          <TextfieldItem
            type={"text"}
            isSelect={false}
            value={email}
            setter={setEmail}
            label={"Email"}
            multiline={false}
            control={control}
            name={"email"}
            error={errors?.email}
          />
          <TextfieldItem
            type={"text"}
            isSelect={false}
            value={phone}
            setter={setPhone}
            label={"Phone"}
            multiline={false}
            control={control}
            name={"phone"}
            error={errors?.phone}
          />
          <TextfieldItem
            type={"text"}
            isSelect={false}
            value={jobTitle}
            setter={setJobTitle}
            label={"Job Title"}
            multiline={false}
            control={control}
            name={"jobTitle"}
            error={errors?.jobTitle}
          />
          <TextfieldItem
            type={"number"}
            isSelect={false}
            value={salaryExpectation}
            setter={setSalaryExpectation}
            label={"Salary Expectation"}
            multiline={false}
            control={control}
            name={"salaryExpectation"}
            error={errors?.salaryExpectation}
          />
          <TextfieldItem
            type={"text"}
            isSelect={true}
            selectList={countryList}
            value={country}
            setter={handleCountryChange}
            label={"Country"}
            multiple={false}
            control={control}
            name={"country"}
            error={errors?.country}
          />
          <TextfieldItem
            type={"text"}
            isSelect={true}
            selectList={cityList}
            value={city}
            setter={setCity}
            label={"City"}
            multiple={false}
            control={control}
            name={"city"}
            error={errors?.city}
          />
          <TextfieldItem
            type={"text"}
            isSelect={false}
            value={address}
            setter={setAddress}
            label={"Address"}
            multiline={true}
            rows={4}
            control={control}
            name={"address"}
            error={errors?.address}
          />
          <Grid
            item
            lg={12}
            xl={12}
            md={12}
            sm={12}
            xs={12}
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <FileUploaderDrag handleChange={handleChange} />
          </Grid>
          <SaveButton />
        </Grid>
      </form>
    </div>
  );
};

export default ApplicantForm;