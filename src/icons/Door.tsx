const Door = ({ size = 16, color = 'currentColor' }) => (
  <svg fill={color} width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.29,3.29,20,11v4.13a1,1,0,0,1-.86,1l-2.06.3A6.11,6.11,0,0,0,12,21H5a1,1,0,0,1-1-1V4A1,1,0,0,1,5,3h6.59A1,1,0,0,1,12.29,3.29ZM20,11H4m4,4h2"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    ></path>
  </svg>
);
export default Door;
