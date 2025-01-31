import React from 'react'

import Paragraph from 'decentraland-gatsby/dist/components/Text/Paragraph'
import useFormatMessage from 'decentraland-gatsby/dist/hooks/useFormatMessage'
import TokenList from 'decentraland-gatsby/dist/utils/dom/TokenList'
import { Button } from 'decentraland-ui/dist/components/Button/Button'
import { Close } from 'decentraland-ui/dist/components/Close/Close'
import { Header } from 'decentraland-ui/dist/components/Header/Header'
import { Modal, ModalProps } from 'decentraland-ui/dist/components/Modal/Modal'

import '../ProposalModal.css'

type Props = Omit<ModalProps, 'children'> & {
  onClickAccept?: (e: React.MouseEvent<unknown>) => void
}

export function EditUpdateModal({ onClickAccept, loading, ...props }: Props) {
  const t = useFormatMessage()

  return (
    <Modal
      {...props}
      size="tiny"
      className={TokenList.join(['GovernanceActionModal', 'ProposalModal', props.className])}
      closeIcon={<Close />}
    >
      <Modal.Content>
        <div className="ProposalModal__Title">
          <Header>{t('modal.edit_update.title')}</Header>
          <Paragraph small>{t('modal.edit_update.description')}</Paragraph>
        </div>
        <div>
          <Button fluid primary onClick={onClickAccept} loading={loading}>
            {t('modal.edit_update.accept')}
          </Button>
          <Button fluid className="cancel" onClick={props.onClose}>
            {t('modal.edit_update.reject')}
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  )
}
