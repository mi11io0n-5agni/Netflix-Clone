import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./header.css";
import NetflixLogo from "../../assets/images/NetflixLogo.png";
import SearchBar from "../Search/SearchBar";
import { useAuth } from "../../context/AuthContext";
import { useMyList } from "../../context/MyListContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/tv", label: "TV Shows" },
  { to: "/movies", label: "Movies" },
  { to: "/latest", label: "Latest" },
  { to: "/my-list", label: "My List", badge: true },
];

const Header = () => {
  const [showBackground, setShowBackground] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();
  const { myList } = useMyList();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setShowBackground(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`header_outer_container ${showBackground ? "nav_black" : ""}`}
    >
      <div className="header_container">
        <div className="header_left">
          <button
            type="button"
            className="header_menu_btn"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          <ul className={`header_nav ${menuOpen ? "header_nav--open" : ""}`}>
            <li>
              <Link to="/">
                <img src={NetflixLogo} alt="Netflix logo" width="100" />
              </Link>
            </li>
            {navLinks.map(({ to, label, badge }) => (
              <li key={to} className={isActive(to) ? "nav_active" : ""}>
                <Link to={to}>
                  {label}
                  {badge && myList.length > 0 && (
                    <span className="nav_badge">{myList.length}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="header_right">
          <ul>
            <li>
              <SearchBar />
            </li>
            <li>
              <NotificationsIcon />
            </li>
            <li className="header_profile" ref={profileRef}>
              <button
                type="button"
                className="header_profile_btn"
                onClick={() => setProfileOpen((prev) => !prev)}
              >
                <span className="header_avatar">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
                <ArrowDropDownIcon />
              </button>
              {profileOpen && (
                <div className="header_dropdown">
                  <p className="header_dropdown_name">{user?.name}</p>
                  <p className="header_dropdown_email">{user?.email}</p>
                  <button type="button" onClick={handleLogout}>
                    Sign out of Netflix
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
