## Access the dashboard

- Retrieve the auto generated password:

```
kubectl -n argo get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 --decode
```

- Port forward the frontend service:

```
kubectl -n argo port-forward service/argo-argocd-server 9999:443
```

Then open the browser on http://localhost:8888 and accept the certificate