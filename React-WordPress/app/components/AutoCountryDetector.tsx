"use client";
import countries from "@/lib/data/countries.json"
import { ConfigProvider, Image,  Select } from "antd"
import { MouseEventHandler, useEffect, useState } from "react"
import useLanguageSwitcher from "../hooks/useLanguageSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import { on } from "events";

interface Data{
    [key: string]: any
}

interface AutoCountryModalProps{
    country:Data,
    currency:string,
    currencySymbol:string,
    open?:boolean,
    onClose?:()=>void,
    onOk?:()=>void,
    loading?:boolean,
    currentLanguage?:string,
    languageConfig:any,
    setCurrentLanguage:(value:string)=>void,
}

function AutoCountryModal(props:AutoCountryModalProps){
    const {country,currency,currencySymbol,open,onClose,onOk,currentLanguage,languageConfig,setCurrentLanguage} = props
    const handleCloseModal:MouseEventHandler<HTMLDivElement> = (e)=>{
        if (e.target !== e.currentTarget) return null
        if(onClose){
            onClose()
        }
    }
    if(!open) return null
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#FCB800",
                },
                components: {
                Select: {
                    /* here is your component tokens */
                },
                },
            }}
            >
            <div onClick={handleCloseModal} className="fixed z-[1001] bg-[rgba(0,0,0,0.5)] top-0 left-0 w-full h-full flex items-center justify-center p-2 sm:p-4">
                <div style={{padding:"32px auto"}} className="bg-white min-h-[70vh] p-10 py-10 flex-1 max-w-[400px]">
                        <div className="flex justify-center">
                            <div className="flex cursor-pointer gap-4 border p-2 items-center">
                                <div className="w-[30px] border h-[20px]">
                                    <Image preview={false} src={country.flags.svg} alt={country.name}/>
                                </div>
                                <p>{currency} - {currencySymbol}</p>
                            </div>
                        </div>
                    <h3 style={{marginBottom:"32px",marginTop:"32px"}} className="font-bold text-4xl text-center">For better delivery prices, select your country</h3>
                    <div className="auto-country-field">
                        <p >Country</p>
                        <Select
                        optionFilterProp="label"
                        value={country.name}
                        defaultValue={country.name}
                        showSearch
                        filterOption={(input, option) =>((option?.label ?? '') as String).toLowerCase().includes(input.toLowerCase())}
                        options={countries.map((country) => ({
                            label: country.name,
                            value: country.name,
                        }))}
                        style={{width:"100%"}}/>
                    </div>
                    <div className="auto-country-field">
                        <p>Currency</p>
                        <Select
                        optionFilterProp="label"
                        value={currency}
                        defaultValue={currency}
                        showSearch
                        filterOption={(input, option) =>((option?.label ?? '') as String).toLowerCase().includes(input.toLowerCase())}
                        options={countries.filter(country=>country.currencies!= undefined).map((country) => country.currencies?({
                            label: `${country.currencies[0].code } - ${country.currencies[0].symbol}`,
                            value: country.currencies[0].code,
                        }):{
                            label:"USD - $",
                            code:"USD"
                        })}
                        style={{width:"100%"}}/>
                    </div>
                    {(!currentLanguage || !languageConfig)?
                        null:(
                            <LanguageSwitcher
                                currentLanguage={currentLanguage}
                                languageConfig={languageConfig}
                                setCurrentLanguage={setCurrentLanguage}
                            />
                        )}
                    <button onClick={onOk} className="w--full bg-[#FCB800] auto-country-btn">Update</button>
                </div>
            </div>
        </ConfigProvider>
    )
}

export default function AutoCountryDetector(){
    const {switchLanguage,setCurrentLanguage,currentLanguage,languageConfig} = useLanguageSwitcher()
    const [open,setOpen] = useState(false)
    const germanyData = countries.find(country => country.name.includes("Germany"))
    const [country,setCountry] = useState(germanyData || countries[0])
    const currency = country.currencies?country.currencies[0].code : "USD"
    const currencySymbol = country.currencies?country.currencies[0].symbol : "$"

    const closeModal = ()=>setOpen(false)
    const openModal = ()=>setOpen(true)
    const onOK = ()=>{
        localStorage.setItem("user-country", JSON.stringify(country))
        switchLanguage(currentLanguage as string)
        closeModal()
    }

    useEffect(()=>{
        const getCountryLocale = async ()=>{
            const res = await fetch("http://ip-api.com/json?fields=8441855")
            const countryString = localStorage.getItem("user-country")

            if(countryString){
                const localCurrentCountry = JSON.parse(countryString)
                setCountry(localCurrentCountry)
                return;
            }
            const countryData = await res.json()
            if(!countryData) return;
            if(countryData.status !== "success") return;
            const currentCountry = countries.find(country => country.name === countryData.country)
            if(currentCountry) {
                localStorage.setItem("user-country", JSON.stringify(currentCountry))
                setCountry(currentCountry)
            }
        }
        getCountryLocale()
    },[])

    return(
        <>
        <AutoCountryModal
        languageConfig={languageConfig}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        country={country}
        currency={currency}
        onClose={closeModal}
        onOk={onOK}
        open={open}
        currencySymbol={currencySymbol}
        />
        <header className="bg-gray-100 p-2 py-4">
            <div className="container flex justify-center">
                <div onClick={openModal} className="flex cursor-pointer gap-4 border p-2 items-center">
                    <div className="w-[30px] border h-[20px]">
                        <Image  preview={false} src={country.flags.svg} alt={country.name}/>
                    </div>
                    <p>{currency} - {currencySymbol}</p>
                    <button><i className="bi bi-chevron-down"></i></button>
                </div>
            </div>
        </header>
        </>
    )
}