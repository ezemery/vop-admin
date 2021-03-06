export const getUsers = () => fetch(`${process.env.REACT_APP_API_HOST}/admin/user`, {
  method: 'GET',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((json) => [...json.users])
  .catch((ex) => {
    throw ex;
  });

export const getAccounts = (userId) => {
  if (userId) {
    return fetch(
      `${process.env.REACT_APP_API_HOST}/admin/user/id/${userId}/account`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => [...json.accounts])
      .catch((ex) => {
        throw ex;
      });
  }
};
export const findUserInUsersById = (users, id) => users.find((element) => element.id.toString() === id);

export const getVideos = (
  lastVideo,
  status,
  hasTags,
  query,
  userId,
  accountId,
  nextVideo,
) => {
  const params = {
    // max_id: lastVideo,
    status,
    has_tags: hasTags,
    query,
    page: nextVideo,
  };
  const esc = encodeURIComponent;
  const queryString = Object.keys(params)
    .filter((k) => params[k] !== '')
    .map((k) => `${esc(k)}=${esc(params[k])}`)
    .join('&');
  return fetch(
    `${process.env.REACT_APP_API_HOST
    }/admin/user/id/${
      userId
    }/account/id/${
      accountId
    }/content?${
      queryString}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((json) => json)
    .catch((ex) => {
      throw ex;
    });
};

export const logo = (color) => {
  const encodedColor = encodeURIComponent(color || '#FFF');
  return `data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 13' fill='${encodedColor}'%3E%3Cpath d='M23.5693 0.398438C22.417 0.397907 21.3096 0.827766 20.4821 1.59692C19.6545 2.36607 19.1717 3.41407 19.136 4.51883V10.9935H19.1611C19.2113 11.3314 19.3869 11.6406 19.6556 11.8642C19.9244 12.0878 20.2683 12.211 20.6241 12.211C20.9799 12.211 21.3238 12.0878 21.5925 11.8642C21.8613 11.6406 22.0369 11.3314 22.0871 10.9935V8.65906C22.6959 8.86577 23.3444 8.94244 23.9873 8.88367C24.6302 8.82491 25.2519 8.63214 25.809 8.31882C26.3661 8.00553 26.8451 7.57927 27.2125 7.06989C27.5799 6.56047 27.8269 5.98024 27.9361 5.36976C28.0453 4.75928 28.0142 4.13325 27.8448 3.53551C27.6754 2.93777 27.372 2.38274 26.9556 1.90924C26.5393 1.43573 26.0201 1.05519 25.4344 0.79423C24.8487 0.533269 24.2107 0.398189 23.5649 0.398438H23.5693ZM23.5693 6.05812C23.277 6.05812 22.9913 5.97501 22.7483 5.81923C22.5053 5.6635 22.3158 5.44213 22.204 5.18314C22.0922 4.92416 22.0629 4.63914 22.1199 4.36419C22.177 4.08925 22.3177 3.8367 22.5244 3.63847C22.731 3.44024 22.9944 3.30525 23.281 3.25056C23.5676 3.19586 23.8648 3.22394 24.1348 3.33122C24.4048 3.43849 24.6356 3.62017 24.798 3.85326C24.9604 4.08635 25.0471 4.36039 25.0471 4.64074C25.0471 5.01666 24.8914 5.37717 24.6142 5.64298C24.3371 5.90879 23.9612 6.05812 23.5693 6.05812Z' /%3E%3Cpath d='M8.54317 0.658589C8.0771 0.399884 7.52303 0.329211 7.00266 0.462096C6.48228 0.59498 6.0382 0.920549 5.76792 1.36729L3.02963 5.97952C2.85243 6.27293 2.75824 6.60563 2.75638 6.9447C2.75451 7.28376 2.84505 7.61744 3.01901 7.91261C3.19297 8.20778 3.44431 8.45425 3.74815 8.62756C4.052 8.8009 4.39776 8.89509 4.75123 8.90078H4.86059H4.90937H4.96847C5.05142 8.89392 5.13385 8.88212 5.21524 8.86535C5.42283 8.82374 5.62234 8.75103 5.80634 8.64988L5.8448 8.62579L5.86991 8.6102C5.91717 8.58185 5.96301 8.55211 6.0088 8.51951C6.24861 8.34587 6.445 8.12311 6.58368 7.86749L9.29389 3.32047C9.42696 3.09844 9.51311 2.85343 9.5474 2.59946C9.58169 2.34548 9.56345 2.08751 9.49373 1.8403C9.42401 1.59309 9.30417 1.36148 9.14106 1.15871C8.97799 0.955947 8.77482 0.786001 8.54317 0.658589Z' /%3E%3Cpath d='M3.81047 1.37167C3.67987 1.14493 3.50344 0.945441 3.29152 0.784864C3.07959 0.624282 2.83641 0.505839 2.57621 0.43645C2.316 0.367064 2.04398 0.348128 1.77605 0.38075C1.50812 0.413372 1.24967 0.496896 1.01579 0.626443C0.781907 0.755987 0.577297 0.928953 0.413927 1.13523C0.250553 1.3415 0.131688 1.57694 0.0642903 1.8278C-0.0031092 2.07864 -0.0176951 2.33986 0.0213857 2.59618C0.0604666 2.85249 0.152431 3.09877 0.291899 3.3206L2.33714 6.76203C2.33813 6.42213 2.43188 6.08837 2.60905 5.79395L4.53015 2.57221L3.81047 1.37167Z'/%3E%3Cpath d='M14.1384 0.472656C13.2616 0.472656 12.4044 0.722046 11.6754 1.18928C10.9463 1.65652 10.3781 2.32063 10.0426 3.09762C9.70702 3.8746 9.61919 4.7296 9.79026 5.55441C9.96133 6.37926 10.3836 7.13693 11.0036 7.73165C11.6236 8.32633 12.4135 8.73128 13.2735 8.89536C14.1335 9.05944 15.0249 8.97523 15.835 8.65339C16.645 8.33156 17.3374 7.78654 17.8246 7.08726C18.3117 6.38798 18.5717 5.56587 18.5717 4.72488C18.5717 3.59711 18.1046 2.51554 17.2732 1.7181C16.4418 0.920658 15.3142 0.472656 14.1384 0.472656ZM14.1384 6.14227C13.8461 6.14227 13.5604 6.05915 13.3174 5.90337C13.0744 5.74764 12.8849 5.52627 12.7731 5.26728C12.6613 5.0083 12.632 4.72328 12.689 4.44833C12.7461 4.17339 12.8868 3.92084 13.0935 3.72261C13.3001 3.52438 13.5635 3.38939 13.8501 3.3347C14.1368 3.28001 14.4339 3.30807 14.7039 3.41535C14.9739 3.52263 15.2047 3.70431 15.3671 3.9374C15.5295 4.17049 15.6162 4.44454 15.6162 4.72488C15.6162 5.10076 15.4605 5.46131 15.1833 5.72712C14.9062 5.99293 14.5303 6.14227 14.1384 6.14227Z'/%3E%3C/svg%3E`;
};

export const loadFB = (callback) => {
  const existingScript = document.getElementById('fb');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.id = 'fb';
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};
