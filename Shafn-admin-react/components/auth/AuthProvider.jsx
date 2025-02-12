import { Spin } from "antd"
import { useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import SettingsRepository from "~/repositories/SettingsRepository"
import UserRepository from "~/repositories/UserRepository"
import { addProfile } from "~/store/profile/action"

function AuthLoader({loadingTitle}) {

    const style = {
        display: "flex",
        position: "fixed",
        alignItems: "center",
        top: 0,
        left: 0,
        zIndex: "100",
        width: "100%",
        height: "100%",
        background: "rgba(260,260,260,0.75)",
        justifyContent: "center"
    }

    return (
        <div style={style}>
            <div className="dialogue" style={{ textAlign: "center" }}>
                <Spin />
                <p style={{ fontSize: "18px" }}>{loadingTitle}</p>
            </div>
        </div>
    )
}

export function useAuth() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    const getStoreData = async (_user) => {
        try {
            const settings = await SettingsRepository.getStore();
            const store = await SettingsRepository.getStoreById(_user.id);
            dispatch(addProfile({ name: settings.store_name,avatar:store.gravatar}));
        } catch (error) {
            console.log("Failed to get store data");
            console.log(error);
        }
    };

    const getAuthData = useMemo(() => {
        return async () => {
            const _user = await UserRepository.getUser();
            if (_user) {
                setUser(_user)
                getStoreData(_user)
            }
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        getAuthData()
    }, [getAuthData])

    return { user, loading }
}


export default function AuthProvider({ children,loaderTitle = "Loading Dashboard" }) {
    const { loading, user } = useAuth()

    useEffect(() => {
        if (!loading && !user) {
            if (user === null) {
                window.location.assign("/login")
            }
        }
    }, [loading, user])

    return (
        <>
            {loading && <AuthLoader loadingTitle={loaderTitle} />}
            {children}
        </>
    )
}