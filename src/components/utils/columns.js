const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      sorter: (a, b) => a.phone.localeCompare(b.phone),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      sorter: (a, b) => a.gender.localeCompare(b.gender),
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
      sorter: (a, b) => a.language.localeCompare(b.language),
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      sorter: (a, b) => a.country.localeCompare(b.country),
    },
    {
      title: 'Idc10',
      dataIndex: 'idc10',
      key: 'idc10',
      sorter: (a, b) => a.idc10.localeCompare(b.idc10),
    },
    {
      title: 'Data Controller',
      dataIndex: 'data_controller',
      key: 'data_controller',
      sorter: (a, b) => a.data_controller.localeCompare(b.data_controller),
    },
    {
      title: 'Consent Gdpr',
      dataIndex: 'consent_gdpr',
      key: 'consent_gdpr',
      sorter: (a, b) => a.consent_gdpr.localeCompare(b.consent_gdpr),
    },
    {
      title: 'Consent Other',
      dataIndex: 'consent_other',
      key: 'consent_other',
      sorter: (a, b) => a.consent_other.localeCompare(b.consent_other),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: (a, b) => a.created_at.localeCompare(b.created_at),
    },
  ];
  export {
      columns
  }