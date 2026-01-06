
import { formatDistanceToNow } from "date-fns";

export const displayTime = (timestamp) => {
	const date = timestamp?.toDate();
	return formatDistanceToNow(date, { addSuffix: true });
};

