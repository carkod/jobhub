import {
  buildBackUrl,
  formdataHeaders,
  handleResponse,
  headers,
} from "../utils";
import { addNotification } from "./notification";

export const SET_APPLICATIONS = "SET_APPLICATIONS";
export const ADD_APPLICATION = "ADD_APPLICATION";
export const APPLICATION_FETCHED = "APPLICATION_FETCHED";
export const RETRIEVED_APPLICATION = "RETRIEVED_APPLICATION";
export const APPLICATION_UPDATED = "APPLICATION_UPDATED";
export const APPLICATION_MOVED_STAGE = "APPLICATION_MOVED_STAGE";
export const APPLICATION_DELETED = "APPLICATION_DELETED";
export const EDIT_APPLICATION = "EDIT_APPLICATION";
export const UPLOAD_FAIL = "UPLOAD_FAIL";
export const UPLOAD_SUCCESS = "UPLOAD_SUCCESS";
export const FILE_REMOVED = "FILE_REMOVED";
export const NOTIFICATION = "NOTIFICATION";

export function moveStage(status) {
  return {
    type: APPLICATION_MOVED_STAGE,
    status,
  };
}

export function setApplications(applications) {
  return {
    type: SET_APPLICATIONS,
    applications,
  };
}

export function applicationDeleted(application) {
  return {
    type: APPLICATION_DELETED,
    application,
  };
}

export function applicationFetched(application) {
  return {
    type: APPLICATION_FETCHED,
    application,
  };
}

export function addApplication(data) {
  return {
    type: ADD_APPLICATION,
    data,
  };
}

export function applicationEdited(data) {
  return {
    type: EDIT_APPLICATION,
    data,
  };
}

export function deletedApplication(id) {
  return {
    type: APPLICATION_DELETED,
    id,
  };
}

export function pastedApplication(id) {
  return {
    type: APPLICATION_DELETED,
    id,
  };
}

export function retrievedApplication(data) {
  return {
    type: RETRIEVED_APPLICATION,
    data,
  };
}

export function uploadFail(file) {
  return {
    type: UPLOAD_FAIL,
    file,
  };
}

export function uploadSuccess(file) {
  return {
    type: UPLOAD_SUCCESS,
    file,
  };
}

export function fileRemoved(file) {
  return {
    type: FILE_REMOVED,
    file,
  };
}

export function removeFile(file) {
  return fetch(`${buildBackUrl().apiUrl}/application-deupload`, {
    method: "post",
    headers: headers,
    body: JSON.stringify(file),
  }).then((res) => res.json());
}

export function uploadFile(file) {
  return fetch(`${buildBackUrl().apiUrl}/application-upload`, {
    method: "post",
    headers: formdataHeaders,
    body: file,
  }).then((res) => res.json());
}

export function deleteApplication(id) {
  return (dispatch) => {
    return fetch(`${buildBackUrl().apiUrl}/application/${id}`, {
      method: "delete",
      headers: headers,
    })
      .then(handleResponse)
      .then((data) => {
        dispatch(applicationDeleted(data));
        dispatch(
          addNotification(applicationDeleted(data), "Application Deleted"),
        );
      });
  };
}

export function copyApplication(data) {
  return (dispatch) => {
    return fetch(`${buildBackUrl().apiUrl}/application/${data._id}`, {
      method: "post",
      body: JSON.stringify(data),
      headers: headers,
    })
      .then(handleResponse)
      .then((data) => {
        dispatch(pastedApplication(data.Application));
        dispatch(
          addNotification(
            pastedApplication(data.Application),
            "Application copied",
          ),
        );
      });
  };
}

export function saveApplication(data) {
  return (dispatch) => {
    return fetch(`${buildBackUrl().apiUrl}/application`, {
      method: "post",
      body: JSON.stringify(data),
      headers: headers,
    })
      .then(handleResponse)
      .then((data) => {
        dispatch(addApplication(data));
        dispatch(addNotification(addApplication(data), "Application saved"));
      });
  };
}

export function editApplication(data, id) {
  return (dispatch) => {
    return fetch(`${buildBackUrl().apiUrl}/application?id=${id}`, {
      method: "put",
      body: JSON.stringify(data),
      headers: headers,
    })
      .then(handleResponse)
      .then((data) => {
        dispatch(applicationEdited(data));
        dispatch(
          addNotification(applicationEdited(data), "Application edited"),
        );
      });
  };
}

export function fetchApplication(id) {
  return (dispatch) => {
    fetch(`${buildBackUrl().apiUrl}/application/${id}`, {
      method: "get",
      headers: headers,
    })
      .then(handleResponse)
      .then((data) => {
        dispatch(applicationFetched(data));
        dispatch(
          addNotification(applicationFetched(data), "Application fetched"),
        );
      });
  };
}

export function getApplications(
  status,
  companyName = null,
  page = null,
  pagesize = null,
) {
  const url = new URL(`${buildBackUrl().apiUrl}/applications`);

  if (status) {
    url.searchParams.append("status", status);
  }

  if (page) {
    url.searchParams.append("page", page);
  }

  if (pagesize) {
    url.searchParams.append("pagesize", pagesize);
  }

  if (companyName) {
    url.searchParams.append("companyName", companyName);
  }

  return (dispatch) => {
    fetch(url, {
      method: "get",
      headers: headers,
    })
      .then(handleResponse)
      .then((data) => {
        dispatch(setApplications(data));
        dispatch(addNotification(setApplications(data), "Applications loaded"));
      });
  };
}

export function moveNextStage(data) {
  return (dispatch) => {
    return fetch(`${buildBackUrl().apiUrl}/application`, {
      method: "post",
      body: JSON.stringify(data),
      headers: headers,
    })
      .then(handleResponse)
      .then((data) => {
        dispatch(moveStage(data));
        dispatch(addNotification(moveStage(data), "Staged moved"));
      });
  };
}

export function fetchCompaniesApplied(companyName) {
  return (dispatch) => {
    fetch(`${buildBackUrl().apiUrl}/companies/${companyName}`, {
      method: "get",
      headers: headers,
    })
      .then(handleResponse)
      .then((data) => {
        dispatch(applicationFetched(data));
        dispatch(
          addNotification(applicationFetched(data), "Application fetched"),
        );
      });
  };
}

const SCAN_POLL_INTERVAL_MS = 3000;
const SCAN_POLL_TIMEOUT_MS = 30 * 60 * 1000;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Starts the scan. The back-end answers at once with 202 and a scanId.
// Use waitForScan to follow it until it ends.
export function scanGmail(creds, limit = 50, method = "post") {
  return (dispatch) => {
    return fetch(`${buildBackUrl().apiUrl}/applications/scan?limit=${limit}`, {
      method,
      body: JSON.stringify(creds),
      headers: headers,
    })
      .then(async (res) => {
        if (res.status === 401) {
          const data = await res.json().catch(() => ({}));
          if (data.code === "GMAIL_UNAUTHORIZED") return data;
        }
        return handleResponse(res);
      })
      .then((data) => {
        if (data.code === "GMAIL_UNAUTHORIZED") return data;
        dispatch(
          addNotification(
            data,
            data.alreadyRunning
              ? "A scan is already running, this may take a while"
              : data.message,
          ),
        );
        return data;
      })
      .catch((e) => {
        dispatch({ ...addNotification(e, e.message), error: true });
        return e;
      });
  };
}

// Polls the scan until it ends. Resolves with the final scan state, or with
// { code: "GMAIL_UNAUTHORIZED" } when the Gmail token expired during the scan.
export function waitForScan(scanId) {
  return async (dispatch) => {
    const startedAt = Date.now();
    try {
      while (Date.now() - startedAt < SCAN_POLL_TIMEOUT_MS) {
        await wait(SCAN_POLL_INTERVAL_MS);
        const scan = await fetch(
          `${buildBackUrl().apiUrl}/applications/scan/${scanId}`,
          { method: "get", headers: headers },
        ).then(handleResponse);

        if (scan.state === "running") continue;

        if (scan.state === "failed") {
          if (
            scan.error?.code === "GMAIL_API_ERROR" &&
            scan.error?.status === 401
          ) {
            return { code: "GMAIL_UNAUTHORIZED" };
          }
          const error = new Error(`Email scan failed: ${scan.error?.message}`);
          dispatch({ ...addNotification(error, error.message), error: true });
          return error;
        }

        const { total = 0, counts = {} } = scan.summary || {};
        dispatch(
          addNotification(
            scan,
            `Scanned ${total} emails: ${counts.created || 0} created, ${counts.updated || 0} updated, ${counts.error || 0} failed`,
          ),
        );
        return scan;
      }
      const timeout = new Error(
        "Email scan is taking too long. Check again later.",
      );
      dispatch({ ...addNotification(timeout, timeout.message), error: true });
      return timeout;
    } catch (e) {
      const message =
        e.code === 404
          ? "The scan was lost, the server may have restarted. Scan again."
          : e.message;
      dispatch({ ...addNotification(e, message), error: true });
      return e;
    }
  };
}
