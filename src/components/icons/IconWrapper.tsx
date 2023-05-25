import { Icon } from "@mui/material";
import { PropsWithChildren } from "react";

const IconWrapper = ({children}: PropsWithChildren) => {
	return (
		<Icon color='primary'>{children}</Icon>
	)
}

export default IconWrapper