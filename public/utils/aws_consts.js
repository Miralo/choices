const REGION = 'eu-east-1';
const USER_POOL_ID = 'eu-west-1_99UW8ocQs';
const CLIENT_ID = '37s6t59igr6uhuu4sdrfpf151v';

AWS.config.update({
	region: REGION
})

const poolData = {
	UserPoolId : USER_POOL_ID,
	ClientId : CLIENT_ID
}

export {
	REGION,
	USER_POOL_ID,
	CLIENT_ID,
	poolData
};