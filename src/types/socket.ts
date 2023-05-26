export const ACK_STATUS = {
	OK: 'OK',
	FAILED: 'FAILED'
}

export type Ack = {
	status: string,
	payload: any
}