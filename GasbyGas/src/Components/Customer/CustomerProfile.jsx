import React, { useState } from "react";
import style from "./CustomerProfile.module.css";
import MainDashboard from "./CustomerDashboard";
import ProfileForm from "./Tables/ProfileForm";

function CustomerProfile(){
    const [selectedOption, setSelectedOption] = useState("Profile");
    return (
        <>
            <div className={style.customerOrders}>
                <div className={style.sidepanel}>
                    <MainDashboard
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                    />
                </div>
                <div className={style.customerOrderContent}>
                    <div className={style.sectionName}>
                        <h2>My Profile</h2>
                    </div>
                    <hr />

                    <div className={style.table}>
                        <ProfileForm />
                    </div>

                    {/* {isDelAlertVisible && (
                         <div className={style.DelpopupOverlay}>
                         <div className={style.DelpopupContent}>
                             <Delete />
                             <button
                                 className={style.closeBtn}
                                 onClick={handleDeleteClose}
                             >
                                 Close
                             </button>
                         </div>
                     </div>
                        
                    )} */}
                </div>
            </div>
        </>
    );
}
export default CustomerProfile;