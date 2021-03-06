import {maxLength, isValidPath, isValidEmail, isValidUrl, isValidVideoUrl, isPathTaken} from '../utils/formValidation'

export const teamFieldSettings = [
  {
    dbField: 'team_name',
    label: 'Team Name',
    type: 'Text',
    required: true,
    validate: maxLength(120),
    helpText: null,
    globallyUnique: true
  },
  {
    dbField: 'description',
    label: 'Description',
    type: 'RichText',
    required: false,
    helpText: null
  },
  {
    dbField: 'image_url',
    label: 'Team Image',
    type: 'Image',
    required: false,
    helpText: null
  },
  {
    dbField: 'path',
    label: 'Url Path',
    type: 'Text',
    required: false,
    validate: isValidPath,
    helpText: 'This is the text that will go at the end of the unique URL generated for this team.',
    globallyUnique: true,
    showOnly: ({action}) => action !== 'create'
  }
]

export const collectionFieldSettings = [
  {
    dbField: 'title',
    label: 'Title',
    type: 'Text',
    required: true,
    validate: maxLength(150),
    helpText: null,
    locallyUnique: true
  },
  {
    dbField: 'image_url',
    label: 'Cover Image',
    type: 'Image',
    required: false,
    helpText: null
  },
  {
    dbField: 'disclaimer_message',
    label: 'Disclaimer Message',
    type: 'RichText',
    required: false,
    helpText: null
  },
  {
    dbField: 'contact_email',
    label: 'Contact Email',
    type: 'Text',
    required: true,
    validate: isValidEmail,
    helpText: null
  },
  {
    dbField: 'created_by',
    label: 'Created by',
    type: 'Text',
    required: true,
    validate: maxLength(150),
    helpText: null
  },
  {
    dbField: 'created_by_image',
    label: 'Created by - Image',
    type: 'Image',
    required: false,
    helpText: null
  },
  {
    dbField: 'path',
    label: 'Url Path',
    type: 'Text',
    required: false,
    validate: isValidPath,
    asyncValidate: isPathTaken,
    helpText: 'This is the text that will go at the end of the unique URL generated for this collection.',
    globallyUnique: true,
    showOnly: ({action}) => action !== 'create'
  }
]

export const subcollectionFieldSettings = [
  {
    dbField: 'title',
    label: 'Title',
    type: 'Text',
    required: true,
    validate: maxLength(150),
    helpText: null,
    locallyUnique: true
  },
  {
    dbField: 'image_url',
    label: 'Cover Image',
    type: 'Image',
    required: false,
    helpText: null
  },
  {
    dbField: 'disclaimer_message',
    label: 'Disclaimer Message',
    type: 'RichText',
    required: false,
    helpText: null
  },
  {
    dbField: 'path',
    label: 'Url Path',
    type: 'Text',
    required: false,
    validate: isValidPath,
    helpText: 'This is the text that will go at the end of the unique URL generated for this subcollection.',
    locallyUnique: true,
    showOnly: ({action}) => action !== 'create'
  }
]

export const resourceFieldSettings = [
  {
    dbField: 'title',
    label: 'Title',
    type: 'Text',
    required: true,
    validate: maxLength(150),
    helpText: null,
    locallyUnique: true
  },
  {
    dbField: 'resource_url',
    label: 'Video Url',
    type: 'Text',
    required: true,
    validate: isValidVideoUrl,
    helpText: null,
    showOnly: ({resourceType}) => resourceType === 'video'
  },
  {
    dbField: 'resource_url',
    label: 'PDF',
    type: 'PDF',
    required: true,
    helpText: null,
    showOnly: ({resourceType}) => resourceType === 'pdf'
  },
  {
    dbField: 'image_url',
    label: 'Image',
    type: 'Image',
    required: true,
    helpText: null,
    showOnly: ({resourceType}) => resourceType === 'image'
  },
  {
    dbField: 'resource_url',
    label: 'External Website Url',
    type: 'Text',
    required: true,
    helpText: null,
    validate: isValidUrl,
    showOnly: ({resourceType}) => resourceType === 'website'
  },
  {
    dbField: 'resource_url',
    label: 'Embed Url',
    type: 'Text',
    required: true,
    helpText: 'Note: some urls do not allow embedding',
    validate: input => isValidUrl(input),
    showOnly: ({resourceType}) => resourceType === 'embed'
  },
  {
    dbField: 'rich_text_content',
    label: 'Text Content',
    type: 'RichText',
    required: true,
    helpText: null,
    showOnly: ({resourceType}) => resourceType === 'rich_text'
  },
  {
    dbField: 'image_url',
    label: 'Cover Image',
    type: 'Image',
    required: false,
    helpText: null,
    showOnly: ({action, resourceType}) => resourceType === 'rich_text' || (action !== 'create' && resourceType !== 'image')
  },
  {
    dbField: 'disclaimer_message',
    label: 'Disclaimer Message',
    type: 'RichText',
    required: false,
    helpText: null
  },
  {
    dbField: 'path',
    label: 'Url Path',
    type: 'Text',
    required: false,
    validate: isValidPath,
    helpText: 'This is the text that will go at the end of the unique URL generated for this resource.',
    locallyUnique: true,
    showOnly: ({action}) => action !== 'create'
  }
]
