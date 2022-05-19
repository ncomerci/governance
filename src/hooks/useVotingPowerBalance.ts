import useAsyncMemo from 'decentraland-gatsby/dist/hooks/useAsyncMemo';

import { Snapshot } from '../api/Snapshot';
import { SNAPSHOT_SPACE } from '../entities/Snapshot/constants';

export default function useVotingPowerBalance(address?: string | null) {
  const [votingPower, state] = useAsyncMemo(
    async () => {
      if (!address) {
        return await Promise.resolve(null)
      }
      return await Snapshot.get().getVotingPower(address, SNAPSHOT_SPACE)
    },
    [address],
    { callWithTruthyDeps: true }
  )
  return {
    votingPower,
    isLoadingVotingPower: state.loading,
  }
}
