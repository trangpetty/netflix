import React, { useState } from "react";
import { useModal } from "../../context/ModalProvider";
import "./profile.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Profile {
    id: number;
    name: string;
    avatar: string;
}

const ProfileModal: React.FC = () => {
    const { isModalOpen } = useModal();
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    // Dummy data
    const [profiles, setProfiles] = useState<Profile[]>([
        { id: 1, name: "John Doe", avatar: "https://www.gravatar.com/avatar/1" },
        { id: 2, name: "Jane Smith", avatar: "https://www.gravatar.com/avatar/2" },
        { id: 3, name: "Bob Marley", avatar: "https://www.gravatar.com/avatar/3" },
    ]);

    if (!isModalOpen) {
        return null; // Điều kiện này giờ nằm sau tất cả các hooks
    }

    const handleEditProfile = (id: number) => {
        alert(`Editing profile ID: ${id}`);
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const toggleCreateMode = () => {
        setIsCreating(!isCreating);
    };

    const handleAddProfile = () => {
        setProfiles([
            ...profiles,
            {
                id: profiles.length + 1,
                name: `New Profile ${profiles.length + 1}`,
                avatar: "https://www.gravatar.com/avatar/new",
            },
        ]);
    };

    return (
        <div className="modal-profile">
            {
                !isCreating ?
                    <>
                        <div className="profile-modal-content">
                            <h1 className="profile-header">Who's watching?</h1>
                            <div className="profiles">
                                {profiles.map((profile) => (
                                    <>
                                        <div key={profile.id} className="profile-container">
                                            <a href="">
                                                <div className="profile-item">
                                                    <div className="avatar-wrapper">
                                                        <div className={`avatar profile-icon ${isEditing ? "editing" : ""}`}
                                                             style={{backgroundImage: `url(${profile.avatar})`}}></div>
                                                        {isEditing && (
                                                            <>
                                                                <div className="overlay">
                                                                    <FontAwesomeIcon icon="fa-solid fa-pencil"
                                                                                     onClick={(e) => {
                                                                                         e.preventDefault();
                                                                                         handleEditProfile(profile.id);
                                                                                     }}/>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                    <div className="profile-name">{profile.name}</div>
                                                </div>
                                            </a>
                                        </div>
                                    </>
                                ))}
                                {
                                    profiles.length < 5 && isEditing ?
                                        <>
                                            <div className="profile-container">
                                                <a href="">
                                                    <div className="profile-item">
                                                        <div className="avatar-wrapper">
                                                            <div className="avatar profile-icon editing"></div>
                                                            <div className="overlay">
                                                                <FontAwesomeIcon icon="fa-solid fa-circle-plus"
                                                                                 className="profile-icon-add"
                                                                                 onClick={(e) => {
                                                                                     e.preventDefault();
                                                                                     toggleCreateMode();
                                                                                 }}/>
                                                            </div>
                                                        </div>
                                                        <div className="profile-name">Add profile</div>
                                                    </div>
                                                </a>
                                            </div>
                                        </>
                                        :
                                        ''
                                }
                            </div>
                            <div className="profile-actions">
                                {
                                    isEditing ?
                                        <>
                                            <button onClick={toggleEditMode} className="profile-button preferred-action">
                                                Done
                                            </button>
                                        </>
                                        :
                                        <>
                                            <button onClick={toggleEditMode} className="profile-button">
                                                Profile Management
                                            </button>
                                        </>
                                }
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="profile-add-content">
                            <div className="text-header">
                                <h1 className="profile-header">Add Profile</h1>
                                <p>Add a profile for another person watching Netflix.</p>
                            </div>
                            <div className="profile-form-add d-flex align-items-center">
                                <a href="" className="avatar-add">
                                    <img src="https://www.gravatar.com/avatar/1" alt=""/>
                                </a>
                                <form>
                                    <input type="text" className="profile-input-name" placeholder="Name"/>
                                    <div className="d-flex align-items-center">
                                        <input type="checkbox"/>
                                        <span className="custom-checkbox"></span>
                                        <span className="ms-3 text-light fs-4">Kid?</span>
                                    </div>
                                </form>
                            </div>
                            <div className="d-flex">
                                <button className="profile-button me-3">CONTINUE</button>
                                <button className="profile-button">CANCEL</button>
                            </div>
                        </div>
                    </>
            }
        </div>
    );
};

export default ProfileModal;
