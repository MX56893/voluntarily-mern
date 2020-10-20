import { FullPage, PageBanner } from '../../components/VTheme/VTheme'
import adminPage from '../../hocs/adminPage'
import reduxApi from '../../lib/redux/reduxApi.js'
import Loading from '../../components/Loading'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import VTabs from '../../components/VTheme/VTabs'
import { Tabs, Button, Table, Modal } from 'antd'
import styled from 'styled-components'

import EditableTagCell from '../../components/TagManagement/EditableTagCell'
import TagSearch from '../../components/TagManagement/TagSearch'
import AddAlias from '../../components/TagManagement/AddAlias'

const { confirm } = Modal

const SearchContainer = styled.div`
  display: inline-block;
  position: relative;
  width: auto;
  padding-bottom: 1em;
  padding-right: 4em;
`
const columns = [
  {
    title: 'Tag',
    dataIndex: 'tag',
    key: 'tag',
    render: (tag) => <EditableTagCell tag={tag} />
  },
  {
    title: 'Aliases',
    dataIndex: 'aliases',
    key: 'aliases',
    render: (aliases) => (
      <span>
        <AddAlias aliases={aliases[0]} tag={aliases[1]} />
      </span>
    )
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action'
  }
]
export const TagMgmtPage = (props) => {
  const aliases = useSelector((state) => state.aliases)
  const [searchVal, setSearchVal] = useState('')
  const dispatch = useDispatch()

  if (!aliases.sync || aliases.loading) {
    return (
      <FullPage>
        <Loading label='aliases' entity={aliases} />
      </FullPage>
    )
  }
  const confirmDelete = (e, tag) => {
    e.preventDefault()
    confirm({
      title: 'Do you want to delete these items?',
      content: (
        <div>Would you like to delete tag <b>{tag}</b> and all of its aliases?</div>
      ),
      onOk () {
        deleteTag(tag)
      },
      onCancel () { console.log('Canceled deletion of ' + tag) }
    })
  }

  const deleteTag = async (tag) => {
    try {
      await dispatch(reduxApi.actions.tagManagement.delete({ id: tag }))
      await dispatch(reduxApi.actions.aliases.get())
    } catch {
      console.error('YEAH NAH for deleting')
    }
  }

  const handleSearch = (value) => {
    setSearchVal(value)
  }

  const addTag = async (value) => {
    try {
      await dispatch(
        reduxApi.actions.tagManagement.post({ id: value }, { tags: [value] })
      )
      await dispatch(reduxApi.actions.aliases.get())
      // setTagToAdd(value)
    } catch {
      console.error('YEAH NAH for adding for tag' + value)
    }
  }
  if (aliases.sync) {
    return (
      <FullPage>
        <PageBanner>
          <h1>Tag Management</h1>
        </PageBanner>
        <VTabs size='large'>
          <Tabs.TabPane tab='Tags' key={1}>
            <SearchContainer>
              <TagSearch value={searchVal} handleSearch={handleSearch} />
            </SearchContainer>
            <Button
              shape='round'
              size='default'
              type='primary'
              onClick={() => addTag(searchVal)}
            >
            Add Tag
            </Button>
            {searchVal && (
              <Table
                dataSource={aliases.data
                  .filter(
                    (alias) =>
                      alias.tag.toLowerCase().includes(searchVal.toLowerCase())
                  )
                  .map((alias, index) => {
                    return {
                      key: index,
                      tag: alias.tag,
                      aliases: [alias.aliases, alias.tag],
                      action: (
                        <a onClick={(e) => confirmDelete(e, alias.tag)}>
                        Remove tag
                        </a>
                      )
                    }
                  })}
                columns={columns}
              />
            )}
            {!searchVal && (
              <Table
                dataSource={aliases.data
                  .map((alias, index) => {
                    return {
                      key: index,
                      tag: alias.tag,
                      aliases: [alias.aliases, alias.tag],
                      action: (
                        <a onClick={(e) => confirmDelete(e, alias.tag)}>
                        Remove tag
                        </a>
                      )
                    }
                  })}
                columns={columns}
              />
            )}
          </Tabs.TabPane>
        </VTabs>
      </FullPage>
    )
  }
}

TagMgmtPage.getInitialProps = async ({ store }) => {
  try {
    await Promise.all([
      store.dispatch(reduxApi.actions.tags.get()),
      store.dispatch(reduxApi.actions.aliases.get())])
  } catch (err) {
    console.error('error in getting tag management page data', err)
  }
}

export default adminPage(TagMgmtPage)
