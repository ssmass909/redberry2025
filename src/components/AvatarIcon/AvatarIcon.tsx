import styles from "./AvatarIcon.module.css";

interface AvatarIconProps {
  avatarSrc: string;
}

const AvatarIcon = ({ avatarSrc }: AvatarIconProps) => {
  return <img className={styles.main} src={avatarSrc} alt="employee avatar" />;
};

export default AvatarIcon;
