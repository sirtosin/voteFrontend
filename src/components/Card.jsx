import React from 'react'
import { Button, Skeleton, Select, Card, Avatar } from 'antd';

const VoteCard = ({ user, partyData, loading, isloading, voteNow,
    onSearch,handleCandidate, handleParty }) => {
    const { Meta } = Card;
    const { Option } = Select;

    return (
      
      <div>
          <Card
              style={{ width: 300, marginTop: 16 }}
          >
              <Skeleton loading={loading} avatar active>
                  <Meta
                      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                      title={user ? user.name : null}
                      description={`NIN number:  ${user ? user.nin : null}`}
                  />

                  <div className='select'>
                      <Select
                          showSearch
                          placeholder="Select candidate"
                          optionFilterProp="children"
                          onChange={handleCandidate}
                          onSearch={onSearch}
                          filterOption={(input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                      >
                          {partyData.map(party => (
                              <Option key={party.id} value={party.candidate}>{party.candidate}    <img style={{
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  float: 'right'
                              }} src={party.img} /></Option>
                          ))}
                      </Select>
                      <Select
                          showSearch
                          placeholder="Select party"
                          optionFilterProp="children"
                          onChange={handleParty}
                       
                      >

                          {partyData.map(party => (
                              <Option key={party.id} value={party.party}>{party.party}  <img style={{
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                    float: 'right'
                              }} src={party.img} /></Option>
                          ))}

                      </Select>
                  </div>
                  <Button type="primary" onClick={voteNow}>{isloading ? "submitting..." : "Vote"}</Button>
              </Skeleton>
          </Card>
    </div>
  )
}

export default VoteCard
