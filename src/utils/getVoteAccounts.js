import { getConnection } from './connection';

export const getVoteAccounts = async()=>await getConnection().getVoteAccounts();
