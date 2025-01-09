import style from "./MainDashboard.module.css"

function MainDashboard(){
    return(
        <>
            <div className={style.Maindashboard}>
                <div className={style.panel}>
                    <div className={style.logo}>GasbyGas</div>
                </div>
                <div className={style.routes}>
                    <span>overview</span>
                </div>
            </div>
        </>
    )
}

export default MainDashboard