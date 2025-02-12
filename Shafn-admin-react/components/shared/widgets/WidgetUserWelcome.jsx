import { connect } from "react-redux";
import { domain } from "~/repositories/Repository";

const WidgetUserWelcome = ({name,avatar:avatarUrl}) => {

  const logout = () => {
    localStorage.removeItem("auth_token");
    window.location.assign(`${domain}/login`);
  };

  return (
    <div className="ps-block--user-wellcome">
      <div className="ps-block__left">
        {avatarUrl && (<img src={avatarUrl.toString()} alt="" style={styles.img} />)}
      </div>
      <div className="ps-block__right">
        <p>
          Hello,<a href="#">{name}</a>
        </p>
      </div>
      <div
        className="ps-block__action"
        style={{ cursor: "pointer" }}
        onClick={logout}
      >
        <i className="icon-exit"></i>
      </div>
    </div>
  );
};

const styles = {
  img: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
};

export default connect((state)=>state.profile)(WidgetUserWelcome);
