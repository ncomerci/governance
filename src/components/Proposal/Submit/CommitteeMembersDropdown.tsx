import React, { useCallback, useMemo } from 'react'
import { Control, Controller } from 'react-hook-form'

import useFormatMessage from 'decentraland-gatsby/dist/hooks/useFormatMessage'
import type { DropdownItemProps } from 'decentraland-ui'
import { Dropdown } from 'decentraland-ui/dist/components/Dropdown/Dropdown'

import { CommitteeName } from '../../../clients/DclData'
import useDclData from '../../../hooks/useDclData'

interface ExtendedController extends React.ComponentProps<typeof Controller> {
  committee?: CommitteeName | null
  loading?: boolean
  disabled?: boolean
  error?: boolean
  control: Control<any, any>
  onOptionClick?: (event: React.MouseEvent<HTMLDivElement>, data: DropdownItemProps) => void
}

type Props = Omit<ExtendedController, 'render'>

function CommitteeMembersDropdown({ committee, control, disabled, loading, error, onOptionClick, ...props }: Props) {
  const [data] = useDclData()
  const committees = useMemo(() => data?.committees || [], [data])
  const t = useFormatMessage()

  const getCommitteeMembers = useCallback(
    (committee: CommitteeName) => {
      const team = committees.find((team) => team.name === committee)
      const members = team?.members || []
      return members.map((member) => ({
        key: member.address,
        value: member.address,
        text: member.name,
        image: { avatar: true, src: member.avatar },
        onClick: onOptionClick,
      }))
    },
    [committees, onOptionClick]
  )

  return (
    <Controller
      control={control}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { ref, onChange, ...field } }) => (
        <Dropdown
          placeholder={t('page.submit_hiring.member_placeholder')}
          fluid
          selection
          options={committee ? getCommitteeMembers(committee) : []}
          disabled={disabled}
          loading={loading}
          error={error}
          {...field}
        />
      )}
      {...props}
    />
  )
}

export default CommitteeMembersDropdown
